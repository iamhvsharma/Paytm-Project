import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, 
      include: "@",
    },
    password: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
