import express from 'express';
import authRoutes from './auth.routes.js';
import applicationRoutes from './application.routes.js';
import truckRoutes from './truck.routes.js';
import tierRoutes from './tier.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use('/trucks', truckRoutes);
router.use('/tiers', tierRoutes);

export default router;