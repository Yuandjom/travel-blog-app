import Post from "../models/postModel.js";
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
    (!title && title.trim()) === "" &&
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
  let post;
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
    //after creating the instance, we need to save it to mongoDb
    post = await post.save();

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
  const { title, description, location, date, image } = req.body;
  const id = req.params.id; //get it from the route /posts/:id
  //check validation
  if (
    (!title && title.trim()) === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
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
      date: new Date(`${date}`),
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
