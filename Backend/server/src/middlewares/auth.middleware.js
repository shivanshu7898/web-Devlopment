import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("api hit hui hai");
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }
};

export const OTPAuthProtect = async (req, res, next) => {
  try {
    const token = req.cookies.kitkat;
    if (!token) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }
    // console.log("Token From MiddleWare : ", token);
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // console.log("Decode:", decode);

    const verifiedUser = await User.findById(decode.id);
    // console.log("VerifiedUser:", verifiedUser);
    if (!verifiedUser) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    // Send the verified user to the Controller for further processing
    req.user = verifiedUser;
    next();

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const RestaurantAuthProtect = async (req, res, next,) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    const verifiedUser = await User.findById(decode.id);
    if (!verifiedUser) {
      const error = new Error("Session Expired");
      error.statusCode = 401;
      return next(error);
    }

    if (verifiedUser.userType !== "restaurant");
    const error = new Error("Session Expired");
    error.statusCode = 403;
    return next(error);
  } catch (error) {
    console.log(error.message);
    next(error);
  }

}