import React, { useState, useEffect } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <Container className="my-5">
      <h1 className="mb-4">Task List</h1>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary" onClick={handleShowForm}>+ Add Task</Button>
        <Form.Check 
          type="switch" 
          label="Dark Mode" 
          checked={darkMode} 
          onChange={() => setDarkMode(!darkMode)} 
        />
      </div>
      <div className="mb-4">
        <Form.Label>Filter by Status</Form.Label>
        <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </Form.Control>
      </div>
      <div className="mb-4">
        <h5>Total Tasks: {filteredTasks.length}</h5>
      </div>
      <TaskList tasks={filteredTasks} deleteTask={deleteTask} showEditForm={showEditForm} />
      <TaskForm
        show={showForm}
        handleClose={handleCloseForm}
        addTask={addTask}
        editTask={editTask}
        taskToEdit={taskToEdit}
      />
    </Container>
  );
}

export default App;
