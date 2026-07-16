
import express from "express";
import{Profile ,ProfileUpdate } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile",protect, Profile);
router.put("/profile/update",protect, ProfileUpdate );

export default router;