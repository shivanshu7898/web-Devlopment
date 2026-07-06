import dotenv from "dotenv";
dotenv.config();

import express from "express";
import AuthRouter from "./src/routers/auth.route.js";
import PublicRouter from "./src/routers/public.route.js";
import connectDB from "./src/config/dbConnection.config.js";

const app = express();

app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);

// Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my first backend Project" });
});

// Default error handler
app.use((err,req,res,next)=>{
  const ErrMessage = err.message || "Internal Sever Error"
  const ErrStatusCode = err.statusCode || 500;

  res.status(ErrStatusCode).json({message:ErrMessage})

})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started on PORT", port);
  connectDB();
});