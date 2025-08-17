import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ 
  todos, 
  editingId, 
  onToggle, 
  onDelete, 
  onEdit, 
  onStartEditing, 
  onCancelEditing 
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onStartEditing={onStartEditing}
          onCancelEditing={onCancelEditing}
        />
      ))}
    </div>
  );
}

export default TodoList;
