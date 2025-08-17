import React from 'react';
import './TodoStats.css';

function TodoStats({ total, completed, subTasks, onClearCompleted }) {
  const remaining = total - completed;
  const hasCompleted = completed > 0;

  if (total === 0) {
    return null;
  }

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <span className="stat-item">
          <strong>{total}</strong> priorities
        </span>
        <span className="stat-item">
          <strong>{subTasks}</strong> sub-tasks
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
