import express from 'express';
import * as DashboardController from '../controllers/Dashboard.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/stats', authenticate, authorize('admin'), DashboardController.GetDashboardStats);

export default router;
