import express from 'express';
import * as ApplicationController from '../controllers/Application.controller.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize('admin'), ApplicationController.ListAllApplications);
router.post('/', ApplicationController.SubmitApplication);
router.put('/review', authenticate, authorize('admin'), ApplicationController.ReviewApplication);

export default router;