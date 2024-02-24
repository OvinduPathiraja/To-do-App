// TaskStatusSelector.jsx
import React, { useState } from 'react';

const TaskStatusSelector = ({ taskId, currentStatus, updateTaskStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleStatusChange = () => {
    const newStatus = selectedStatus === 'Pending' ? 'In Progress' : 'Pending';
    setSelectedStatus(newStatus);
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="inline-block relative">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 rounded-full p-1 text-center leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default TaskStatusSelector;
