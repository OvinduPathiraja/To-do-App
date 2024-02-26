import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReusableButton from "../components/ReusableButton.jsx";
import TaskStatusSelector from "../components/TaskStatusSelector.jsx";
import MainButton from "../components/MainButton.jsx";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };
  

  const handleClearSelectedTasks = async () => {
    try {
      await Promise.all(selectedTasks.map((taskId) => deleteTask(taskId)));
      console.log("All selected tasks deleted successfully.");
      setSelectedTasks([]);
      fetchData(); // Update state directly, no need for window.location.reload()
    } catch (error) {
      console.error("Error clearing selected tasks: ", error);
    }
  };

  const updateTask = (id, type) => {
    let newStatus;
  
    switch (type) {
      case 'In Progress':
        newStatus = 'In Progress';
        break;
      case 'Completed':
      default:
        newStatus = 'Pending';
        break;
    }
  
    const token = localStorage.getItem('jwt');
  
    axios
      .put(
        `${import.meta.env.VITE_APP_API_URL}/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchData(); // Fetch data after updating the task
      })
      .catch((error) => {
        console.error('Error updating task: ', error);
      });
  };
  
  const handleCheckboxChange = (id) => {
    const updatedSelectedTasks = selectedTasks.includes(id)
      ? selectedTasks.filter((taskId) => taskId !== id)
      : [...selectedTasks, id];
    setSelectedTasks(updatedSelectedTasks);
  };

  const filterTasksByStatus = async (status) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const handleCompleteTasks = async () => {
    try {
      const token = localStorage.getItem("jwt");
  
      for (const taskId of selectedTasks) {
        const data = {
          status: "Completed",
        };
  
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/tasks/${taskId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      setSelectedTasks((prevSelectedTasks) => {
        // Clear the selected tasks
        const updatedSelectedTasks = [];
  
        // Fetch fresh data after completing tasks
        fetchData();
  
        return updatedSelectedTasks;
      });
      window.location.reload();
    } catch (error) {
      console.error("Error completing tasks: ", error);
    }
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
