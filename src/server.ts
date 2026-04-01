import app from './app.js';
import { env } from './config/env.js';
import prisma from './config/prisma.js';

const server = app.listen(env.PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Connected to Database`);
    console.log(`Server listening on port: ${env.PORT}`);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
