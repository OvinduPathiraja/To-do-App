import React from "react";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../components/Spinner";


const ShowTask = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  });

  return (
    <div className="p-4">
      <BackButton destination="/" />
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-600">ID</span>
          <span className="text-xl">{task._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-600">Title</span>
          <span className="text-xl">{task.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-600">Due Date</span>
          <span className="text-xl">{task.dueDate}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-600">Status</span>
          <span className="text-xl">{task.status}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-600">Description</span>
          <span className="text-xl">{task.description}</span>
        </div> 
      </div> 
 </div>
  );
  
};

export default ShowTask;
