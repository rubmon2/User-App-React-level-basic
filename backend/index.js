import express from 'express';
import userRoutes from './src/routes/user.routes.js';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
