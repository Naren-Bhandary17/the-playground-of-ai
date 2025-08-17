import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const editTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
      setEditingId(null);
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Todo App</h1>
          <p>Organize your tasks efficiently</p>
        </header>
        
        <TodoForm onAdd={addTodo} />
        
        <TodoStats 
          total={todos.length} 
          completed={todos.filter(todo => todo.completed).length}
          onClearCompleted={clearCompleted}
        />
        
        <TodoList
          todos={todos}
          editingId={editingId}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onStartEditing={startEditing}
          onCancelEditing={cancelEditing}
        />
      </div>
    </div>
  );
}

export default App;
