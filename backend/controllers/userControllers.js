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
