import express from 'express';
import { RegisterUser, Login,Logout } from '../controllers/auth.controller.js';


const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;
