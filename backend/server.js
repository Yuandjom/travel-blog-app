import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
dotenv.config();
//this is the middleware to have the body parser (so that you can test with Postman)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
connectdb();

//Routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

app.listen(5000, () => console.log("Listening to localhost Port 5000"));
