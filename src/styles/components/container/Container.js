import React from 'react';
import './container.scss';

const Container = ({ children, className = '' }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
