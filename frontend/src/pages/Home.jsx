import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TASK_URL } from "../config.js";
import ReusableButton from "../components/ReusableButton.jsx";
import TaskStatusBadge from "../components/TaskStatusBadge.jsx";
import MainButton from "../components/MainButton.jsx";
import TaskStatusSelector from "../components/TaskStatusSelector.jsx";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const type = "";

  useEffect(() => {
    console.log("process.env.REACT_APP_API_URL");
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/tasks`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:   ", error);
      });
  }, []);

  const deleteTask = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task: ", error);
      });
  };

  const updateTask = (id, type) => {
    const newStatus = type === "In Progress" ? "In Progress" : "Pending";
    axios
      .put(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
        status: newStatus,
      })
      .then(() => {
        axios
          .get(`${import.meta.env.VITE_APP_API_URL}`)
          .then((response) => {
            setTasks(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error updating task: ", error);
      });
  };

  const handleCheckboxChange = (id) => {
    const updatedSelectedTasks = selectedTasks.includes(id)
      ? selectedTasks.filter((taskId) => taskId !== id)
      : [...selectedTasks, id];
    setSelectedTasks(updatedSelectedTasks);
  };

  const handleClearSelectedTasks = () => {
    selectedTasks.forEach((taskId) => {
      deleteTask(taskId);
    });
    setSelectedTasks([]);
    window.location.reload();
  };

  const filterTasksByStatus = async (status) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tasks`
      );
      const allTasks = response.data;

      if (status === "All Tasks") {
        setTasks(allTasks);
      } else {
        const filteredTasks = allTasks.filter((task) => task.status === status);
        setTasks(filteredTasks);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFilterButtonClick = (status) => {
    filterTasksByStatus(status);
  };

  const handleCompleteTasks = () => {
    selectedTasks.forEach((taskId) => {
      const data = {
        status: "Completed",
      };

      axios
        .put(`${import.meta.env.VITE_APP_API_URL}/tasks/${taskId}`, data)
        .then(() => {
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}`)
            .then((response) => {
              setTasks(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data: ", error);
            });
        })
        .catch((error) => {
          console.error("Error updating task status: ", error);
        });
    });

    setSelectedTasks([]);

    window.location.reload();
  };

  return (
    <div className="p-4">
      <div className="flex items-center p-2">
        <h1 className="text-3xl font-bold">TODO</h1>
      </div>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="p-[100px] w-half flex-box align-middle">
            <div className="flex mb-4">
              <ReusableButton
                onClick={() => handleFilterButtonClick("All Tasks")}
              >
                All Tasks
              </ReusableButton>
              <ReusableButton
                onClick={() => handleFilterButtonClick("Pending")}
              >
                Pending
              </ReusableButton>
              <ReusableButton
                onClick={() => handleFilterButtonClick("In Progress")}
              >
                In Progress
              </ReusableButton>
              <ReusableButton
                onClick={() => handleFilterButtonClick("Completed")}
              >
                Completed
              </ReusableButton>
              <div className="flex-grow"></div>
              <Link
                to="/addtask"
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Add Task
              </Link>
            </div>

            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 pl-4">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-600 w-4 h-4 border-gray-200 rounded focus:ring-blue-500"
                        onChange={() => {
                          const allCheckbox =
                            document.getElementById("checkbox-all");
                          const checkboxes =
                            document.querySelectorAll("[id^='checkbox-']");
                          checkboxes.forEach((checkbox) => {
                            checkbox.checked = allCheckbox.checked;
                            handleCheckboxChange(checkbox.value);
                          });
                        }}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      <span className="sr-only">Title</span>
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      <span className="sr-only">Due Date</span>
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      <span className="sr-only">Status</span>
                      Status
                    </th>
                    <th scope="col" className="py-3 pl-4"></th>
                    <th
                      colSpan={2}
                      className="text-center px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      <span className="sr-only">Actions</span>
                      Actions
                    </th>
                    <th scope="col" className="py-3 pl-4"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="pl-4">
                        <div className="flex items-center h-5">
                          <input
                            id={`checkbox-${task._id}`}
                            type="checkbox"
                            className="text-blue-600 w-4 h-4 border-gray-200 rounded focus:ring-blue-500"
                            value={task._id}
                            onChange={() => handleCheckboxChange(task._id)}
                          />
                          <label
                            htmlFor={`checkbox-${task._id}`}
                            className="sr-only"
                          >
                            Checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(task.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <TaskStatusSelector
                          taskId={task._id}
                          currentStatus={task.status}
                          updateTaskStatus={updateTask}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {task.status === "Pending" ? (
                          <button
                            onClick={() => updateTask(task._id, "In Progress")}
                            className="text-green-600 hover:text-red-300"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            onClick={() => updateTask(task._id, "Pending")}
                            className="text-red-600 hover:text-green-300"
                          >
                            Deactivate
                          </button>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/taskinfo/${task._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-600 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <MainButton onClick={handleClearSelectedTasks}>Clear</MainButton>
              <MainButton onClick={handleCompleteTasks}>
                Complete Tasks
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
