import express from 'express';
import * as UserController from '../controllers/User.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/drivers', authenticate, UserController.GetAllDrivers);
router.post('/drivers', authenticate, authorize('admin'), UserController.CreateDriver);
router.put('/drivers/:id', authenticate, authorize('admin'), UserController.UpdateDriver);
router.delete('/drivers/:id', authenticate, authorize('admin'), UserController.DeleteDriver);

export default router;
