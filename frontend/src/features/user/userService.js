import axios from "axios";

//get the id from the localstorage
export const getUserDetails = async () => {
  //
  const id = localStorage.getItem("userId");
  //this is a get request send tot he backend and we need to get a response
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No user found");
  }
  //get the user data from res.data
  const resData = await res.data;
  return resData;
};
