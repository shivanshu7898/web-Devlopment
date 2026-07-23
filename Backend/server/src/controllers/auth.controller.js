import User from "../models/user.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/auth.service.js";
import OTP from "../models/otp.js";
import { sendMail } from "../utils/sendMail.service.js";
import { genOTPToken } from "../utils/auth.service.js";
import { OTPAuthProtect } from "../middlewares/auth.middleware.js"
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    res
      .status(201)
      .json({ message: "user register successfully", data: NewUser });
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
  }
};

export const UpdatePassword = async (req, res, next) => {
  try {
    const { Email, oldPassword, newPassword } = req.body;


    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Old Password Incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;

    await user.save();

    return res.status(200).json({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const SendOtp = async (req, res, next) => {
  try {
    const { Email } = req.body;
    if (!Email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ Email });
    console.log(existingUser);

    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 404;
      return next(error);
    }

    // Generate and send OTP here
    const newOTP = (Math.floor(Math.random() * 1000000) + 100000)
      .toString()
      .slice(0, 6);

    //Send OTP via Email
    const hashedOTP = await bcrypt.hash(newOTP, 10);
    const existingOTP = await OTP.findOne({ Email });
    if (existingOTP) {
      await existingOTP.deleteOne();
    }

    const saveOTP = await OTP.create({
      Email,
      otp: hashedOTP,
    });
    await sendMail(Email, newOTP);

    res.status(200).json({ message: `OTP sent on '${Email}'` });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
export const VerifyOtp = async (req, res, next) => {
  try {
    const { Email, otp } = req.body;

    if (!Email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingOTP = await OTP.findOne({ Email });
    if (!existingOTP) {
      const error = new Error("OTP Expired");
      const statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(otp, existingOTP.otp);
    if (!isVerified) {
      const error = new Error("OTP Expired");
      const statusCode = 401;
      return next(error);
    }

    await existingOTP.deleteOne();

    const existingUser = await User.findOne({ Email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 404;
      return next(error);
    }

    await genOTPToken(existingUser, res);
    res
      .status(200)
      .json({ message: "OTP verified. Create You New Password Now" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    const currentUser = req.user;
    console.log(currentUser);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    currentUser.password = hashedPassword;

    await currentUser.save();

    res.status(200).json({ message: "Password Changed" });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};
export const GoogleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Credential Required",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({
        message: "Invalid Google Token",
      });
    }

    const {
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(400).json({
        message: "Google Email Not Verified",
      });
    }

    // Find User
    let user = await User.findOne({
      Email: email,
    });

    // Create User if not exists
    if (!user) {
      user = await User.create({
        fullName: name,
        Email: email,
        password: "", // Better: make password optional in schema
        number: "",
        dob: null,
        photo: {
          url: picture,
          publicId: null,
        },
        userType: "customer",
      });
    }

    // Generate JWT
    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "lax",
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      data: userObj,
    });

  } catch (error) {
    next(error);
  }
};