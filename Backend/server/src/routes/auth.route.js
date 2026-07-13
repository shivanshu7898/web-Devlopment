import express from 'express';
import { RegisterUser,Login } from '../controllers/auth.controller.js';


const router = express.Router();


router.post("/register", RegisterUser);
router.post("/login",Login);
export default router;
