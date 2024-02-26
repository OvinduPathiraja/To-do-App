import React, { useState } from 'react';

const TaskStatusSelector = ({ taskId, currentStatus, updateTaskStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleStatusChange = () => {
    let newStatus;
  
    switch (selectedStatus) {
      case 'Pending':
        newStatus = 'In Progress';
        break;
      case 'In Progress':
        newStatus = 'Completed';
        break;
      case 'Completed':
      default:
        newStatus = 'Pending';
        break;
    }
  
    setSelectedStatus(newStatus);
    updateTaskStatus(taskId, newStatus);
  };
  

  // Define a function to get the dynamic background color based on the selected status
  const getBackgroundColor = () => {
    switch (selectedStatus) {
      case 'Pending':
        return '#f08484';
      case 'In Progress':
        return '#fcd695';
      case 'Completed':
        return '#9dcfab';
      default:
        return '#8db58e';
    }
  };

  // Define a function to get the dynamic text color based on the selected status
  const getTextColor = () => {
    switch (selectedStatus) {
      case 'Pending':
        return 'white';
      case 'In Progress':
        return '#8f2b03';
      case 'Completed':
        return '#0e6326';
      default:
        return 'white';
    }
  };

  return (
    <div className="inline-block relative">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="block appearance-none text-sm w-full rounded-full p-1 text-center leading-tight focus:outline-none "
        style={{ backgroundColor: getBackgroundColor(), color: getTextColor() }}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskStatusSelector;
