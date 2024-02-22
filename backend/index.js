import express from "express";
import { PORT , MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Hello World");
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
