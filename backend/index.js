import express from "express";
import { PORT , MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Task } from "./models/taskModel.js";


const app = express();
app.use(bodyParser.json());


//create a task
app.post("/tasks", async(req, res) => {
  try{
    return res.status(201).send(await Task.create(req.body));
  }catch(error){
    return res.status(500).send(error.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
    }).catch((err) => {
    console.log("Error connecting to MongoDB", err);
    }
);
