import express from 'express';
import * as TierController from '../controllers/Tier.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), TierController.CreateTier);
router.get('/', authenticate, TierController.GetAllTiers);
router.get('/:id', authenticate, TierController.GetTierById);
router.get('/truck/:truckId', authenticate, TierController.GetTiersByTruckId);
router.put('/:id', authenticate, authorize('admin', 'driver'), TierController.UpdateTier); // Drivers might need to update tier condition
router.delete('/:id', authenticate, authorize('admin'), TierController.DeleteTier);

export default router;
