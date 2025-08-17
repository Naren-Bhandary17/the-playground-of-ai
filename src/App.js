import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import './App.css';

function App() {
  const [priorities, setPriorities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load priorities from localStorage on component mount
  useEffect(() => {
    const savedPriorities = localStorage.getItem('priorities');
    if (savedPriorities) {
      try {
        setPriorities(JSON.parse(savedPriorities));
      } catch (error) {
        console.error('Error loading priorities from localStorage:', error);
      }
    }
  }, []);

  // Save priorities to localStorage whenever priorities change
  useEffect(() => {
    localStorage.setItem('priorities', JSON.stringify(priorities));
  }, [priorities]);

  const addPriority = (text) => {
    if (text.trim() && priorities.length < 3) {
      const newPriority = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        subTasks: [],
        priorityLevel: priorities.length + 1
      };
      setPriorities([...priorities, newPriority]);
    }
  };

  const addSubTask = (priorityId, text) => {
    if (text.trim()) {
      setPriorities(priorities.map(priority => {
        if (priority.id === priorityId && priority.subTasks.length < 3) {
          const newSubTask = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
          };
          return {
            ...priority,
            subTasks: [...priority.subTasks, newSubTask]
          };
        }
        return priority;
      }));
    }
  };

  const togglePriority = (id) => {
    setPriorities(priorities.map(priority =>
      priority.id === id ? { ...priority, completed: !priority.completed } : priority
    ));
  };

  const toggleSubTask = (priorityId, subTaskId) => {
    setPriorities(priorities.map(priority => {
      if (priority.id === priorityId) {
        return {
          ...priority,
          subTasks: priority.subTasks.map(subTask =>
            subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
          )
        };
      }
      return priority;
    }));
  };

  const deletePriority = (id) => {
    setPriorities(priorities.filter(priority => priority.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
    // Reorder remaining priorities
    setPriorities(prev => prev.map((priority, index) => ({
      ...priority,
      priorityLevel: index + 1
    })));
  };

  const deleteSubTask = (priorityId, subTaskId) => {
    setPriorities(priorities.map(priority => {
      if (priority.id === priorityId) {
        return {
          ...priority,
          subTasks: priority.subTasks.filter(subTask => subTask.id !== subTaskId)
        };
      }
      return priority;
    }));
  };

  const editPriority = (id, newText) => {
    if (newText.trim()) {
      setPriorities(priorities.map(priority =>
        priority.id === id ? { ...priority, text: newText.trim() } : priority
      ));
      setEditingId(null);
    }
  };

  const editSubTask = (priorityId, subTaskId, newText) => {
    if (newText.trim()) {
      setPriorities(priorities.map(priority => {
        if (priority.id === priorityId) {
          return {
            ...priority,
            subTasks: priority.subTasks.map(subTask =>
              subTask.id === subTaskId ? { ...subTask, text: newText.trim() } : subTask
            )
          };
        }
        return priority;
      }));
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const clearCompleted = () => {
    setPriorities(priorities.filter(priority => !priority.completed));
  };

  const canAddPriority = priorities.length < 3;
  const totalSubTasks = priorities.reduce((sum, priority) => sum + priority.subTasks.length, 0);

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>3-3-3</h1>
          <p>Pick 3 priorities with 3 sub tasks and spend 3 hours to focus on them</p>
        </header>
        
        <TodoForm onAdd={addPriority} disabled={!canAddPriority} />
        
        <TodoStats 
          total={priorities.length} 
          completed={priorities.filter(priority => priority.completed).length}
          subTasks={totalSubTasks}
          onClearCompleted={clearCompleted}
        />
        
        <TodoList
          priorities={priorities}
          editingId={editingId}
          onTogglePriority={togglePriority}
          onToggleSubTask={toggleSubTask}
          onDeletePriority={deletePriority}
          onDeleteSubTask={deleteSubTask}
          onEditPriority={editPriority}
          onEditSubTask={editSubTask}
          onAddSubTask={addSubTask}
          onStartEditing={startEditing}
          onCancelEditing={cancelEditing}
        />
      </div>
    </div>
  );
}

export default App;
