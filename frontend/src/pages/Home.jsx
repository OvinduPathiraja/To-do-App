import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5555/tasks')
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex items-center p-2'>
                <h1 className='text-3xl font-bold'>TODO</h1>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="p-[100px] w-half flex-box align-middle">
                    <div className="ml-auto mb-4 flex justify-end pr-12">
                            <Link to='/addtask' className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add Task</Link>
                        </div>
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3 pl-4">
                                            
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            <span className="sr-only">Title</span>
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            <span className="sr-only">Due Date</span>
                                            Due Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            <span className="sr-only">Status</span>
                                            Status
                                        </th>
                                        <th colSpan={2} className="text-center px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            <span className="sr-only">Actions</span>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map((task) => (
                                        <tr key={task._id}>
                                            <td className="pl-4">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="checkbox"
                                                        type="checkbox"
                                                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                    />
                                                    <label
                                                        htmlFor="checkbox"
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
                                            </td>


                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="#" className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
}

export default Home;
