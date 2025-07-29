import express from 'express';
import { signup, verifyOtp, login, googleLogin } from '../controllers/authController';
const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/google-login', googleLogin);

export default router;
