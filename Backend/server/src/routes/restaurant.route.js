import express from "express";
import {RestaurantUpdateProfile,RestaurantGetData,RestaurantUpdateInfo,openRestaurant,RestaurantUpdateLegalInfo,RestaurantMenuItems,RestaurantAddItem} from "../controllers/restaurant.controller.js"
import upload from "../middlewares/multer.js";
import { RestaurantAuthProtect } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();
router.post("/update-profile",RestaurantAuthProtect,
  upload.single("coverImage"),
  upload.array("restaurantImage", 10),
  RestaurantUpdateProfile,
);
router.get("/get-restaurant-data",RestaurantAuthProtect, RestaurantGetData);
router.put("/update-restaurant-info",RestaurantAuthProtect,RestaurantUpdateInfo);
router.patch("/change-open-status/:openStatus",RestaurantAuthProtect, openRestaurant);
router.put("/update-legal-info",RestaurantAuthProtect, RestaurantUpdateLegalInfo);
router.get("/menu-items", RestaurantAuthProtect,RestaurantMenuItems);
router.post("/add-menu-item",RestaurantAuthProtect,upload.single("itemImage"), RestaurantAddItem);


export default router;