import express from 'express';
import * as AuthController from '../controllers/Auth.controller.js';

const router = express.Router();

router.post('/login', AuthController.Login);
router.post('/validate-token', AuthController.ValidateToken);

export default router;