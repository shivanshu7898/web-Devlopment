
import User from "../models/user.js";


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
      data:user,
    });
  } catch (error) {
    next(error);
  }
};