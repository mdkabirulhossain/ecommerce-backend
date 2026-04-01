import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import ApiError from './utils/ApiError.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

const app: Express = express();

// Security HTTP headers
app.use(helmet());

// Parse response body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// v1 api docs
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next) => {
  next(new ApiError(404, 'Not found'));
});

// global error handler
app.use(errorHandler);

export default app;
