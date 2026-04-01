import prisma from './src/config/prisma.js';

async function test() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'nonexistent@example.com' }
    });
    console.log('Result:', user);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
