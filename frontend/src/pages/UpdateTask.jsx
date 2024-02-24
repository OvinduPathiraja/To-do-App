import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const UpdateTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`);
        const data = await response.json();
        setTitle(data.title);
        setDueDate(data.date);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching task data: ', error);
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
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Task updated successfully');
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  return (
    <div>
      <div className="pl-10 block pt-6">
        <BackButton />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className="p-4 block min-w-96 mx-auto">
          <h1 className="text-3xl font-bold">Update Task</h1>
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
            <div className="my-4 justify-center flex">
              <Link to={`/taskinfo/${id}`} className="text-indigo-600 hover:text-indigo-900">
                View Task
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
