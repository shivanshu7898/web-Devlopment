import User from "../models/user.js";
import bcrypt from "bcrypt";
import genToken from "../utils/auth.service.js";

export const RegisterUser = async (req, res, next) => {
  try {
    const { fullName, Email, number, dob, password, userType } = req.body;

    if (!fullName || !Email || !password || !number || !dob || !userType) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }
    if (!["customer", "restaurant", "rider"].includes(userType)) {
      const error = new Error("Invalid user type");
      error.statusCode = 404;
      return next(error);
    }
    
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }

    const photoUrl = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

    const photo = {
      url: photoUrl,
      publicId: null,
    };

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);
    const NewUser = await User.create({
      fullName,
      Email,
      number,
      password: hashedPassword,
      dob,
      photo,
      userType: userType || undefined,
    });

    res.status(201).json({ message: "user register successfully", data: NewUser });
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { Email, password, userType } = req.body;

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
    const userObj = existingUser.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: "Login Successful",
      data: userObj,
    });
  } catch (error) {
    next(error);
  }
};


export const Logout = (req, res, next) => {

  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    next(error);
  };
};

