import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import AuthRouter from "./src/routers/auth.route.js"
import PublicRouter from "./src/routers/public.route.js"
import connectDB from "./src/config/dbConnection.config.js"

const app = express();

app.use("/auth",AuthRouter);
app.use("/public",PublicRouter);
// Default API
app.get("/",(req,res)=>{
    console.log("Server Started")
    res.json({message: "Default Get API Hit"})
});


const port = process.env.PORT || 5000;

app.listen(port , ()=>{
    console.log("Server Started on port:", port);
    connectDB();
    
});