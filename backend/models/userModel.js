//model will contain the schema of the user

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
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    posts: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
//mongodb will store a collection of users
const User = mongoose.model("User", userSchema);

export default User;
