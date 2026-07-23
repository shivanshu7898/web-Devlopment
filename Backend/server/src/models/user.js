import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  number: {
    type: String,
    default: "",
  },

  photo: {
    url: String,
    publicId: String,
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
  }
});


const user = mongoose.model("user", UserSchema);
export default user;
