import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  //define the fields
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    //this is the image url
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  //need to relate to the user
  user: {
    //this is to set up the relationship between the post and the user
    //Every post only has a single user
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
//note that mongoDB stores the collection in plural form
const Post = mongoose.model("Post", postSchema);

export default Post;
