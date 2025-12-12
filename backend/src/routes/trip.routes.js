import express from 'express';
import * as TripController from '../controllers/Trip.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), TripController.CreateTrip);
router.get('/', authenticate, TripController.GetAllTrips);
router.get('/:id', authenticate, TripController.GetTripById);
router.put('/:id', authenticate, authorize('admin', 'driver'), TripController.UpdateTrip);
router.delete('/:id', authenticate, authorize('admin'), TripController.DeleteTrip);

export default router;
