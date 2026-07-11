import dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorhandler from "./src/middlewares/error-handler.js";
import AuthRouter from "./src/routes/auth.route.js";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  console.log("API hit...");
  res.status(200).json({ message: "Welcome my First server...." });
});
app.use(errorhandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server starting now....", port);
  connectDB();
});
