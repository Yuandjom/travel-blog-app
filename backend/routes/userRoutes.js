/**
 * Note that in Route is where you have all ur HTTP methods
 */
import express from "express";
import { getAllUsers, signup } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers); //note that u need ur controller function here
//sign up request
router.post("/signup", signup);

//make sure to export it
export default router;
