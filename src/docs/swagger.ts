import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../config/env.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce Backend',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/v1`,
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
