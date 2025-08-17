import React, { useState } from 'react';
import './PriorityItem.css';

function PriorityItem({ 
  priority, 
  isEditing, 
  onTogglePriority, 
  onToggleSubTask,
  onDeletePriority, 
  onDeleteSubTask,
  onEditPriority, 
  onEditSubTask,
  onAddSubTask,
  onStartEditing, 
  onCancelEditing 
}) {
  const [editText, setEditText] = useState(priority.text);
  const [newSubTaskText, setNewSubTaskText] = useState('');

  const handleEditPriority = () => {
    onEditPriority(priority.id, editText);
  };

  const handleCancelEdit = () => {
    setEditText(priority.text);
    onCancelEditing();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditPriority();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (newSubTaskText.trim() && priority.subTasks.length < 3) {
      onAddSubTask(priority.id, newSubTaskText);
      setNewSubTaskText('');
    }
  };

  const getPriorityButtonColor = (priorityLevel) => {
    switch (priorityLevel) {
      case 1: return '#ff5f56'; // Red
      case 2: return '#ffbd2e'; // Orange
      case 3: return '#27ca3f'; // Green (changed from yellow for better visibility)
      default: return '#ff5f56';
    }
  };

  if (isEditing) {
    return (
      <div className="priority-item editing">
        <div className="priority-header">
          <div className="priority-button" style={{ backgroundColor: getPriorityButtonColor(priority.priorityLevel) }}></div>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="edit-input"
            autoFocus
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleEditPriority} className="save-button">
            Save
          </button>
          <button onClick={handleCancelEdit} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`priority-item ${priority.completed ? 'completed' : ''}`}>
      <div className="priority-header">
        <div className="priority-button" style={{ backgroundColor: getPriorityButtonColor(priority.priorityLevel) }}></div>
        <div className="priority-content">
          <input
            type="checkbox"
            checked={priority.completed}
            onChange={() => onTogglePriority(priority.id)}
            className="priority-checkbox"
          />
          <span className="priority-text">{priority.text}</span>
        </div>
        <div className="priority-actions">
          <button 
            onClick={() => onStartEditing(priority.id)} 
            className="edit-button"
            title="Edit priority"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDeletePriority(priority.id)} 
            className="delete-button"
            title="Delete priority"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Sub-tasks */}
      <div className="sub-tasks">
        {priority.subTasks.map(subTask => (
          <div key={subTask.id} className={`sub-task ${subTask.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={subTask.completed}
              onChange={() => onToggleSubTask(priority.id, subTask.id)}
              className="sub-task-checkbox"
            />
            <span className="sub-task-text">{subTask.text}</span>
            <button 
              onClick={() => onDeleteSubTask(priority.id, subTask.id)} 
              className="delete-sub-task-button"
              title="Delete sub-task"
            >
              ×
            </button>
          </div>
        ))}
        
        {/* Add sub-task form */}
        {priority.subTasks.length < 3 && (
          <form className="add-sub-task-form" onSubmit={handleAddSubTask}>
            <input
              type="text"
              value={newSubTaskText}
              onChange={(e) => setNewSubTaskText(e.target.value)}
              placeholder="Add sub-task..."
              className="sub-task-input"
            />
            <button type="submit" className="add-sub-task-button" disabled={!newSubTaskText.trim()}>
              +
            </button>
          </form>
        )}
        
        {priority.subTasks.length >= 3 && (
          <div className="sub-task-limit">
            <span>Maximum 3 sub-tasks reached</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PriorityItem;
