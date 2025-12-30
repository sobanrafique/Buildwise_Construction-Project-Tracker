import React from 'react';
import './EmptyState.css';

const EmptyState = ({ type = 'items', message }) => {
  return (
    <div className="empty-state">
      <p>{message || `No ${type} found.`}</p>
    </div>
  );
};

export default EmptyState;

