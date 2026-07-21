import express from 'express';
import { RegisterUser, Login,Logout,UpdatePassword } from '../controllers/auth.controller.js';
import protect from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login", Login);
router.post("/logout", Logout);
router.put("/update-password",protect, UpdatePassword);

export default router;
