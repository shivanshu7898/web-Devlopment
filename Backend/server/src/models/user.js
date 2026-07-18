import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    photo: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["customer", "restaurant", "rider"],
      default: "customer",
    }
  },
  {
    timestamps: true,
  },
);


const user = mongoose.model("user", UserSchema);
export default user;
