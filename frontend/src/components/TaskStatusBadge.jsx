import React from 'react';

const TaskStatusBadge = ({ status }) => {
  let badgeColor = '';
  switch (status) {
    case 'Pending':
      badgeColor = 'bg-red-200 text-orange-900';
      break;
    case 'Completed':
      badgeColor = 'bg-green-100 text-green-900';
      break;
    default:
      badgeColor = 'bg-orange-100 text-orange-800';
  }

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badgeColor}`}>
      {status}
    </span>
  );
};

export default TaskStatusBadge;
