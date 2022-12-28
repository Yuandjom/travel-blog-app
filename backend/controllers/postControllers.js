import mongoose from "mongoose";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
/**
 * @description
 * @route
 * @access
 */

/**
 * @description Get all the users post
 * @route       GET /posts/
 * @access      Public
 */

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    //find all the posts
    posts = await Post.find();
  } catch (error) {
    return console.log(error);
  }
  //Validation check
  if (!posts) {
    //internal server error
    return res
      .status(500)
      .json({ message: "Internal Server Error in postModel" });
  }

  //if all is well
  //send back the json with all the post directly
  return res.status(200).json({ posts });
}; //remember to export after the function is done

/**
 * @description Add a post
 * @route       POST /posts/
 * @access      Public (currently public, should it be private?)
 */
export const addPost = async (req, res) => {
  //we need to get something from the req.body
  //refer to the postModel for what to destructure and what to get
  const { title, description, location, date, image, user } = req.body;

  //check validation
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !user &&
    !image &&
    image.trim() === ""
  ) {
    //this is unprocessable entity
    return res.status(422).json({ message: "Invalid Entity" });
  }
  //extract the user
  let existingUser;
  try {
    existingUser = await User.findById(user); //remember to import the model on the top
  } catch (error) {
    return console.log(error);
  }
  //validation
  if (!existingUser) {
    return res.status(404).json({ message: "User is not found" });
  }

  let post;
  //before we are saving the post, we need to store the post in the user's post array in userModel
  try {
    //CREATE an instance of the post model
    post = new Post({
      title,
      description,
      image,
      location,
      date: new Date(`${date}`),
      user,
    });
    //create a session to store
    const session = await mongoose.startSession();
    session.startTransaction();
    //use the reference
    //push will add an item into the user's post array (look at userModel.js)
    existingUser.posts.push(post);
    existingUser.save({ session }); //ES6 dont need session: session
    //after creating the instance, we need to save it to mongoDb
    post = await post.save({ session });
    session.commitTransaction();
    //check for validation
    if (!post) {
      return res.status(500).json({
        message: "Post not created: Unexpected internal server error",
      });
    }
    //else if everything goes smoothly
    return res.status(201).json({ post });
  } catch (error) {
    return console.log(error);
  }
};

/**
 * @description Get a post by its ID
 * @route       GET /posts/:id
 * @access      Public
 */
export const getPostById = async (req, res) => {
  //when we define :id in the /posts/:id we can get the id by using this
  //we are geting the id from the url
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(404).json({ message: "No post Found" });
  }
  return res.status(200).json({ post });
};

/**
 * @description Update a post
 * @route       PUT /posts/:id
 * @access      Public
 */

export const updatePost = async (req, res) => {
  //get data from the frontend
  //we need to get something from the req.body
  //refer to the postModel for what to destructure and what to get
  const { title, description, location, image } = req.body;
  const id = req.params.id; //get it from the route /posts/:id
  //check validation
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !image &&
    image.trim() === ""
  ) {
    //this is unprocessable entity
    return res.status(422).json({ message: "Invalid Entity" });
  }
  let post;
  try {
    //this is so that we can find by that ID and update it
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      location,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "unable to update user" });
  }
  //if everything is okay
  return res.status(200).json({ message: "Updated Successfully" });
};

/**
 * @description Delete a post
 * @route       DELETE /posts/:id
 * @access      Public
 */
export const deletePost = async (req, res) => {
  //first we have to get the id from the url
  const id = req.params.id; //note that params.id is from the url
  let post;
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    //get the user details
    //populate a recall
    post = await Post.findById(id).populate("user"); // thiswill give u an object of the user
    post.user.posts.pull(post); //pull means deleting that recall from the array
    await post.user.save({ session }); //after we pull we need to save that user in the SAME SESSION
    post = await Post.findByIdAndRemove(id);
    session.commitTransaction();
  } catch (error) {
    return console.log(error);
  }
  if (!post) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};
