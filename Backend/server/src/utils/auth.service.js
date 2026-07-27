import jwt from "jsonwebtoken";

export const genToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1D" });
};

export const genOTPToken = async (user, res) => {
  try {
    const payload = { id: user._id };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    res.cookie("kitkat", token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    console.log(token);
  } catch (error) {
    throw error;
  }
};

