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
    //link it to the object id in the postModel
    /**mongoose.Types.ObjectId
     *     Basically this will assign the ObjectId to that post
     *     the ObjectId will give the reference to any object Id
     */
    /**
     * ref:
     * this is the reference to the type of the ObjectId of a specific document
     *
     * Note: the ref property is refering to the Post in postModel
     * const Post = mongoose.model("Post", postSchema);
     */
    //Since this is an array of post, this means that every user can make multiple post
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);
//mongodb will store a collection of users
const User = mongoose.model("User", userSchema);

export default User;
