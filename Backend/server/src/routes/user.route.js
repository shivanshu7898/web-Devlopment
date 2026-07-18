
import express from "express";
import{Profile ,ProfileUpdate } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";
import multer from "multer";


const router = express.Router();

router.get("/profile",protect, Profile);
router.put("/profile/update",protect,upload.single("image"), ProfileUpdate );


export default router;