
import User from "../models/user.js";
import cloudinary from "../../config/cloudinary.js";


export const Profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const ProfileUpdate = async (req, res, next) => {
  try {
    const { Email, fullName, number } = req.body;

    if (!Email || !fullName || !number) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    user.Email = Email.toLowerCase();
    user.fullName = fullName;
    user.number = number;

    if (req.file && req.file.buffer) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "profiles" }
      );

      user.photo = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await user.save();

    res.status(200).json({ message: "User Updated Successfully", data: user });

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

