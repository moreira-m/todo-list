import React from 'react';
import './button.scss'; 

const Button = ({ children, onClick, className = 'add-button' }) => {
  return (
    <button className={`add-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
