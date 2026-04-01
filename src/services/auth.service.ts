import bcrypt from 'bcryptjs';
import ApiError from '../utils/ApiError.js';
import prisma from '../config/prisma.js';
import { generateToken } from '../utils/jwt.js';

const register = async (userData: any) => {
  console.log('User registration attempt:', userData);
  const { email, password, name } = userData;

  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

const login = async (email: string, password: string) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    accessToken,
  };
};

export default {
  register,
  login,
};
