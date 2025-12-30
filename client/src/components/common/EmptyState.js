import React from 'react';
import './EmptyState.css';

const EmptyState = ({ type = 'default', message }) => {
  const messages = {
    tasks: message || 'No tasks found. Create your first task to get started.',
    projects: message || 'No projects found.',
    default: message || 'No items found.'
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">📋</div>
      <h3>Nothing here yet</h3>
      <p>{messages[type] || messages.default}</p>
    </div>
  );
};

export default EmptyState;

