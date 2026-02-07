import express from 'express';
import { login,logout } from '../Controllers/AuthController.js';


const router = express.Router();

// Login route
router.post('/login', login);
router.post('/logout', logout);


export default router;