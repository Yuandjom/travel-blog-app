import axios from "axios";
//this is the root URL
const API_URL = "/posts/";

export const getAllPosts = async () => {
  const res = await axios.get("http://localhost:5000/posts");
  if (res.status !== 200) {
    return console.log("Some Error Occurred");
  }

  const data = res.data;
  return data;
};
