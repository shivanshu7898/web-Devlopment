import express from 'express';
import { RegisterUser, Login, Logout, UpdatePassword, SendOtp, VerifyOtp, ResetPassword, GoogleLogin, GoogleRegister } from '../controllers/auth.controller.js';
import { protect, OTPAuthProtect } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update-password", protect, UpdatePassword);
router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);
router.post("/google-login", GoogleLogin);
router.post("/google-register", GoogleRegister);

export default router;
