import express from "express";
import {
  addPost,
  getAllPosts,
  getPostById,
} from "../controllers/postControllers.js";

const router = express.Router();

//this is the get response from the postControllers
/**Get */
router.get("/", getAllPosts);
router.get("/:id", getPostById); //get from params which is the id

/**Post */
router.post("/", addPost);

export default router; //after this need to bring it to server.js and use the app.use
