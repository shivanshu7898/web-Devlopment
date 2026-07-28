import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
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
      default: () => new Date(Date.now() + 5 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: true },
);

const OTP = mongoose.model("otp", otpSchema);

export default OTP;
