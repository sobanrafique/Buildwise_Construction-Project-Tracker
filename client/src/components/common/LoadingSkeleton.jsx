import React from 'react';
import './LoadingSkeleton.css';

export const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="skeleton-title" />
    <div className="skeleton-line" />
    <div className="skeleton-line short" />
  </div>
);

