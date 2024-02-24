
import React from 'react';

const MainButton = ({ children, onClick }) => {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4" onClick={onClick}>
      {children}
    </button>
  );
};

export default MainButton;
