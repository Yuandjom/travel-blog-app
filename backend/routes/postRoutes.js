import express from "express";
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/postControllers.js";

const router = express.Router();

//this is the get response from the postControllers
/**Get */
router.get("/", getAllPosts);
router.get("/:id", getPostById); //get from params which is the id

/**Post */
router.post("/", addPost);

//put request is used to update something from the request
router.put("/:id", updatePost);

export default router; //after this need to bring it to server.js and use the app.use
