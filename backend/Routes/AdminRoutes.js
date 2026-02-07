import express from 'express';
import { registerAgent } from '../Controllers/AdminController.js';
import { protect } from '../Middleware/AuthMiddleware.js';
const router = express.Router();


// Register agent route (only for admin)
router.post('/register-agent', protect, registerAgent);

export default router;