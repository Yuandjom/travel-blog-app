import User from "../models/userModel.js";
/**Read */
/**
 * @description Get all the users
 * @route       GET /user/
 * @access      Public
 */

export const getAllUsers = async (req, res) => {
  let users;
  //communicate with the mongoDB need have the try/catch block
  try {
    //the await is based on the User model
    //with the mongoDB model, we can access the find function
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }
  if (!users) {
    //note that 500 is internal server error
    return res
      .status(500)
      .json({ message: "User not found: Unexpected Error Occured" });
  }
  //if there is a user
  //we will send back the users inside that
  return res.status(200).json({ users });
};

/**Create */
/**
 * @description Sign up a user
 * @route       Post /user/signup/
 * @access      Public
 */
/**
 * Note that for the route,
 */
//this is the request send from the frontend
export const signup = async (req, res, next) => {
  //we will get the data from the req.body
  //destructure it
  const { name, email, password } = req.body;

  //check for the validation
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    //422 is data cannnot be processed
    return res.status(422).json({ message: "Invalid Data" });
  }

  //create a new instance of the user
  let user;
  try {
    //user equal to the new user document
    //providing the attributes
    user = new User({ email, name, password });
    //now we have the user object, we need to save it into mongoDB!!!!! IMPT
    //save returns a promise, so we need to await.
    await user.save();
  } catch (error) {
    console.log(error);
  }

  //if the user is not saved
  if (!user) {
    //500 is the internal server error
    return res
      .status(500)
      .json({ message: "Internal Server error: Unexpected Error Occurred" });
  }

  return res.status(201).json({ user });
};
