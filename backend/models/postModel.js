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
    type: String,
    required: true,
  },
});
//note that mongoDB stores the collection in plural form
const Post = mongoose.model("Post", postSchema);

export default Post;
