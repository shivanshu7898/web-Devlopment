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

//Default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my first backend Project" });
});

// default Error Handler

app.use ((err, req , res, next)=>{
    const ErrMessage = err.message|| "internal server Error";
    const ErrStatusCode = err.StatusCode ||500;
    res.Status(ErrStatusCode ).json({message: ErrMessage});
});                        

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started on port:", port);
  connectDB();
});