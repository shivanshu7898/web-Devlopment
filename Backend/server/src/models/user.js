import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    number: {
      type: String,
      default: "",
    },

    photo: {
      url: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    dob: {
      type: Date,
      default: null,
    },

    password: {
      type: String,
      default: null,
    },

    userType: {
      type: String,
      enum: ["customer", "restaurant", "rider"],
      default: null,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("user", UserSchema);
export default user