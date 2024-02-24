import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import "../App.css";
import TaskStatusBadge from "../components/TaskStatusBadge";
import { TASK_URL } from "../config.js";
import MainButton from "../components/MainButton.jsx";

const ShowTask = () => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${TASK_URL}/${id}`);
        const taskData = response.data;
  
        // Set the task data to the state variables
        setTitle(taskData.title);
        setDueDate(taskData.date);
        setDescription(taskData.description);
  
        setTask(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task data: ", error);
      }
    };
  
    fetchTask();
  }, [id]);
  

  const handleUpdate = async () => {
    const data = {
      title,
      date: dueDate,
      description,
    };

    try {
      await axios.put(`http://localhost:5555/tasks/${id}`, data);
      console.log("Task updated successfully");
      setModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="p-12">
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="flex flex-col rounded-xl w-full p-2">
              <div className="my-4">
                <label htmlFor="title" className="text-l mr-4 text-grey-600">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full p-3 text-gray-900 border rounded-lg bg-gray-50 text-xs dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-3 block">
                <label htmlFor="dueDate" className="text-l mr-4 text-grey-600">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="block w-full p-3 text-gray-900 border rounded-lg bg-gray-50 text-xs dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="description"
                  className="text-l mr-4 text-grey-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-l block w-full p-3 text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-4 justify-center flex">
                <MainButton onClick={handleUpdate}>Update</MainButton>
              </div>
            </div>
            <button
              className="close-modal text-red-700 font-bold"
              onClick={toggleModal}
            >
              X
            </button>
          </div>
        </div>
      )}

      <BackButton destination="/" />

      <div className="p-4 flex justify-center ">
        <div >
          <div className="flex flex-col w-fit p-4">
            <div className="my-4">
              <p className="font-serif text-3xl font-bold">{task.title}</p>
            </div>
            <div className="my-4">
              <span className="text-xl">{task.description}</span>
            </div>
          </div>
        </div>
        <div className="pl-12">
          <button onClick={toggleModal}>
            <MdEditSquare className="w-10 h-10 mt-8" />
          </button>
          <div className="flex flex-col w-fit pt-6">
            <div className="my-4">
              <TaskStatusBadge status={task.status} />
            </div>
              <span className="text-xl">{formatDate(task.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
