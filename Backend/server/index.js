import dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorhandler from "./src/middlewares/error-handler.js";
import AuthRouter from "./src/routes/auth.route.js";
import UserRouter from "./src/routes/user.route.js";
import restaurantRouter from "./src/routes/restaurant.route.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "./config/cloudinary.js";
import morgan from "morgan";

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true }));
app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser())

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/restaurant", restaurantRouter);

app.get("/", (req, res) => {
  console.log("API hit...");
  res.status(200).json({ message: "Welcome my First server...." });
});
app.use(errorhandler);
const port = process.env.PORT || 5000;
app.listen(port,async () => {
  console.log("server starting now....", port);
  connectDB();
  try {
    const result = await cloudinary.api.ping();
    console.log("cloudinary Connect :");
    console.log(result);
    
    
  } catch (error) {
    console.log(error.message);
    process.exit(1);
    
    
  }
});
