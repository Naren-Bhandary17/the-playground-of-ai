import React from 'react';
import './TodoStats.css';

function TodoStats({ total, completed, onClearCompleted }) {
  const remaining = total - completed;
  const hasCompleted = completed > 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <span className="stat-item">
          <strong>{total}</strong> total
        </span>
        <span className="stat-item">
          <strong>{remaining}</strong> remaining
        </span>
        <span className="stat-item">
          <strong>{completed}</strong> completed
        </span>
      </div>
      {hasCompleted && (
        <button 
          onClick={onClearCompleted} 
          className="clear-completed-button"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

export default TodoStats;
