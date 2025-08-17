import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onAdd(text);
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Maximum 3 priorities reached" : "Add a priority..."}
          className="todo-input"
          disabled={disabled}
        />
        <button type="submit" className="add-button" disabled={!text.trim() || disabled}>
          +
        </button>
      </div>
      {disabled && (
        <div className="limit-message">
          <span>Maximum 3 priorities reached</span>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
