import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: [
        "register",
        "forgot-password",
        "change-email",
      ],
      required: true,
    },

    userData: {
      type: Object,
      default: null,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    },
  },
  { timestamps: true },
);

const OTP = mongoose.model("otp", otpSchema);

export default OTP;
