import User from "../models/user.model";
export const RegisterUser = async (req, res) => {
  try {
    const { FullName, Email, password, phone } = req.body;
    if (!FullName || !Email || !password || !phone) {
      res.status(400).json({ message: "All Fields Required" });
      return;
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      res.status(409).json({ message: "Email Already Registered" });
      return;
    }
  } catch (error) {}
};
export const LoginUser = (req, res) => {
  res.json({ message: "login " });
};
export const LogoutUser = (req, res) => {
  res.json({ message: "logout " });
};
