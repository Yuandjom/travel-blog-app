import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

//connect to mongodb
connectdb();

//Routes
app.use("/user", userRoutes);

app.listen(5000, () => console.log("Listening to localhost Port 5000"));
