import React from 'react';
import './LoadingSkeleton.css';

export const CardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-line skeleton-short"></div>
    </div>
  );
};

export default CardSkeleton;

