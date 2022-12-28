import axios from "axios";
//this is the root URL
const API_URL = "/posts/"; //note that the default URL is in index.js

//Get all posts
export const getAllPosts = async () => {
  const res = await axios.get(API_URL);
  if (res.status !== 200) {
    return console.log("Some Error Occurred");
  }

  const data = res.data;
  return data;
};

/**
 * Sign up and Login API function to sendAuthRequest to the backend
 */
export const sendAuthRequest = async (signup, data) => {
  //note that we are sending the data to the backend
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}/`, {
      name: data.name ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    return console.log("Unable to Autheticate");
  }
  const resData = await res.data;
  return resData;
};

/**
 * add Post to the Backend
 * This is a POST request
 */
export const addPost = async (data) => {
  //make request to the backend
  /**
   * REMEMBER to check the postModel.js for the key-value pair
   */
  const res = await axios
    .post("/posts/", {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageURL,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  //Check the validation
  if (res.status !== 201) {
    return console.log("Error Occurred in addPost");
  }

  //if everything is okay, we will destructure the data
  //here we are getting the data from the response
  const resData = await res.data;
  return resData;
};

/**
 * Get that specific post detail
 *
 */
export const getPostDetails = async (id) => {
  const res = await axios.get(`/posts/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to fetch diary");
  }
  //if everything works fine, we will receive the data from the response
  const resData = await res.data;
  return resData;
};

export const postUpdate = async (data, id) => {
  const res = await axios
    .put(`/posts/${id}`, {
      title: data.title,
      description: data.description,
      location: data.location,
      image: data.imageURL,
    })
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unable to update");
  }

  const resData = await res.data;
  return resData;
};

export const postDelete = async (id) => {
  const res = await axios
    .delete(`/posts/${id}`)
    .catch((err) => console.log(err));

  //check for validation
  if (res.status !== 200) {
    return console.log("Unable to delete");
  }

  const resData = await res.data;
  return resData;
};
