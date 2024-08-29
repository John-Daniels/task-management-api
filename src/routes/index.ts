import { Router } from 'express';
const router = Router();
import userRoutes from './users.route';
import tasksRoutes from './tasks.route';
import verifyAuthToken from '../middlewares/auth.middleware';

router.use('/users', userRoutes);

// @authenticated route
router.use(verifyAuthToken);
router.use('/tasks', tasksRoutes);

export default router;
