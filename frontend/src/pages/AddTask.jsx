import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import { format } from "date-fns";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const dueDateObject = new Date(dueDate);
    const formattedDate = format(dueDateObject, 'yyyy-MM-dd');
  
    const data = {
      title,
      date: formattedDate,
      status:"Pending",
      description,
    };
  
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/tasks`, data)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error adding task: ', error);
      });
  };

  return (
    <div>
      <div className="pl-10 block pt-6">
        <BackButton />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="p-4 block min-w-96 mx-auto">
          <h1 className="text-3xl font-bold">Add Task</h1>
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
                className="text-l block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-4 justify-center flex">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md "
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
