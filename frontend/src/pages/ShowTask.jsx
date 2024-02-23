import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdEditSquare } from "react-icons/md";
import "../App.css";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../components/Spinner";

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
        const response = await axios.get(`http://localhost:5555/tasks/${id}`);
        setTask(response.data);
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
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // Function to format date without timezone
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
                  className="text-xl block w-full p-3 text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-4 justify-center flex">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md "
                >
                  Update Task
                </button>
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
        <div className="pr-12">
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
            <MdEditSquare className="w-10 h-10" />
          </button>
          <div className="flex flex-col w-fit p-4">
            <div className="my-4 ">
              <span className="text-xl">{formatDate(task.date)}</span>
            </div>
            <div className="my-4">
              {task.status === "Pending" ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-green-800">
                  {task.status}
                </span>
              ) : task.status === "Completed" ? (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {task.status}
                </span>
              ) : (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {task.status}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
