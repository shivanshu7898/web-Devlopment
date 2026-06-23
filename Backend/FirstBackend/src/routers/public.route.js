import express from 'express';
import { ContactUs } from '../controllers/public.controller.js';
const router = express.Router();


router.post("/contact",ContactUs);
export default router;