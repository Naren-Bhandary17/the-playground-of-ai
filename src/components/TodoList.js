import React from 'react';
import PriorityItem from './PriorityItem';
import './TodoList.css';

function TodoList({ 
  priorities, 
  editingId, 
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
  if (priorities.length === 0) {
    return (
      <div className="empty-state">
        <p>No priorities yet. Add your first priority above to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {priorities.map(priority => (
        <PriorityItem
          key={priority.id}
          priority={priority}
          isEditing={editingId === priority.id}
          onTogglePriority={onTogglePriority}
          onToggleSubTask={onToggleSubTask}
          onDeletePriority={onDeletePriority}
          onDeleteSubTask={onDeleteSubTask}
          onEditPriority={onEditPriority}
          onEditSubTask={onEditSubTask}
          onAddSubTask={onAddSubTask}
          onStartEditing={onStartEditing}
          onCancelEditing={onCancelEditing}
        />
      ))}
    </div>
  );
}

export default TodoList;
