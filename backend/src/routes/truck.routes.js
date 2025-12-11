import express from 'express';
import * as TruckController from '../controllers/Truck.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), TruckController.CreateTruck);
router.get('/', authenticate, TruckController.GetAllTrucks);
router.get('/:id', authenticate, TruckController.GetTruckById);
router.put('/:id', authenticate, authorize('admin'), TruckController.UpdateTruck);
router.delete('/:id', authenticate, authorize('admin'), TruckController.DeleteTruck);

export default router;
