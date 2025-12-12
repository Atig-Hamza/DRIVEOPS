import express from 'express';
import * as UserController from '../controllers/User.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/drivers', authenticate, UserController.GetAllDrivers);

export default router;
