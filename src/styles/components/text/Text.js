import React from 'react';
import './text.scss';

const Text = ({ children, className = '' }) => {
  return <p className={`text ${className}`}>{children}</p>;
};

export default Text;
