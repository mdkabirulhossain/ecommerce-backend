import prisma from '../config/prisma.js';

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export default {
  getUserById,
};
