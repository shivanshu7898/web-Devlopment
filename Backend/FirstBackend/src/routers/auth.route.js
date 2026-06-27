import express from "express";
import {
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../controllers/auth.controller.js";
import { sampleMiddlewares,sampleMiddlewares2 } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/login", sampleMiddlewares , LoginUser);
router.post("/register", sampleMiddlewares , sampleMiddlewares2 ,RegisterUser);
router.get("/logout", LogoutUser);

export default router;