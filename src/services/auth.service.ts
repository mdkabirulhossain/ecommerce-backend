import bcrypt from 'bcryptjs';
import ApiError from '../utils/ApiError.js';
import prisma from '../config/prisma.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { sendOtpEmail } from './mail.service.js';

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

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      verificationOtp: otp,
      verificationOtpExpires: otpExpires,
      isVerified: false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isVerified: true,
      createdAt: true,
    },
  });

  // Send verification email
  await sendOtpEmail(email, otp);

  return user;
};

const verifyEmail = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  if (user.verificationOtp !== otp) {
    throw new ApiError(400, 'Invalid OTP');
  }

  if (user.verificationOtpExpires && user.verificationOtpExpires < new Date()) {
    throw new ApiError(400, 'OTP expired');
  }

  // Update user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationOtp: null,
      verificationOtpExpires: null,
    },
  });

  return { message: 'Email verified successfully' };
};

const login = async (email: string, password: string) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if user is verified
  if (!user.isVerified) {
    throw new ApiError(401, 'Please verify your email to log in');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    tokens: {
      access: accessToken,
      refresh: refreshToken,
    },
  };
};

const refreshTokens = async (refreshToken: string) => {
  try {
    const decoded = verifyRefreshToken(refreshToken) as any;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new Error();
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ id: user.id, role: user.role });

    return {
      access: accessToken,
      refresh: newRefreshToken,
    };
  } catch (error) {
    throw new ApiError(401, 'Please authenticate');
  }
};

export default {
  register,
  verifyEmail,
  login,
  refreshTokens,
};
