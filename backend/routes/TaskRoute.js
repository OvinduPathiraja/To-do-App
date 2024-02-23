import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();


// //create a task
router.post("/", async(req, res) => {
    try{
      return res.status(201).send(await Task.create(req.body));
    }catch(error){
      return res.status(500).send(error.message);
    }
  });
  
  //get all 
  router.get("/", async(req, res) => {
    try{
      return res.status(200).send(await Task.find());
    }catch(error){
      return res.status(500).send(error.message);
    }
  });
  
  //get a task by id
  router.get("/:id", async(req, res) => {
    try{
      return res.status(200).send(await Task.findById(req.params.id));
    }catch(error){
      return res.status(500).send(error.message);
    }
  });


  //delelte a task by id
    router.delete("/:id", async(req, res) => {
        try{
        return res.status(200).send(await Task.findByIdAndDelete(req.params.id));
        }catch(error){
        return res.status(500).send(error.message);
        }
    });

    //update a task by id
    router.put("/:id", async(req, res) => {
        try{
        return res.status(200).send(await Task.findByIdAndUpdate
        (req.params.id, req.body, {new: true}));
        }catch(error){
        return res.status(500).send(error.message);
        }
    }
    );


export default router;