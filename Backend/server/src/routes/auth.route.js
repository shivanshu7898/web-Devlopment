import express from 'express';
import { SendRegisterOTP , Login, Logout, UpdatePassword, SendOtp, VerifyOtp, ResetPassword, GoogleLogin } from '../controllers/auth.controller.js';
import { protect, OTPAuthProtect } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post("/send-register-otp ", SendRegisterOTP );
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update-password", protect, UpdatePassword);
router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);
router.post("/google-login", GoogleLogin);


export default router;
