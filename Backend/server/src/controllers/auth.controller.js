import User from "../models/user.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.service.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, Email, number, password } = req.body;

    if (!fullName || !Email || !password || !number) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);
    const NewUser = await User.create({
      fullName,
      Email,
      number,
      password: hashedPassword,
    });

    res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ Email });

    if (!existingUser) {
      const error = new Error("Invalid Email");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }
    const token = genToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successful",
      data: {
        fullName: existingUser.fullName,
        Email: existingUser.Email,
        number: existingUser.number,
      },
    });
  } catch (error) {
    next(error);
  }
};
