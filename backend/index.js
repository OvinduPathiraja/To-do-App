import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TaskRoute from "./routes/TaskRoute.js";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use("/tasks", TaskRoute);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    }).catch((err) => {
    console.log("Error connecting to MongoDB", err);
    }
);
