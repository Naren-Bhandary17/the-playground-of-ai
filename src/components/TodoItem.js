import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ 
  todo, 
  isEditing, 
  onToggle, 
  onDelete, 
  onEdit, 
  onStartEditing, 
  onCancelEditing 
}) {
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    onCancelEditing();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="edit-input"
          autoFocus
        />
        <div className="edit-actions">
          <button onClick={handleEdit} className="save-button">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-actions">
        <button 
          onClick={() => onStartEditing(todo.id)} 
          className="edit-button"
          title="Edit todo"
        >
          ✏️
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="delete-button"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
