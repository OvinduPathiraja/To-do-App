// ReusableButton.jsx

import React from 'react';

const ReusableButton = ({ children, onClick }) => {
  return (
    <button className="rounded-xl p-2 border-blue-400 border-2 ml-2 hover:bg-sky-100" onClick={onClick}>
      {children}
    </button>
  );
};

export default ReusableButton;
