import express, { Router } from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import testRoutes from './test.routes.js';

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/products',
    route: productRoutes,
  },
  {
    path: '/',
    route: testRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
