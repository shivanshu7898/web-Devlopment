
import express from "express";
import{Profile} from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile",protect, Profile);

export default router;