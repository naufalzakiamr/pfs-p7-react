import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
  const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do', dueDate: '', image: null });

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTask({ ...task, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = () => {
    taskToEdit ? editTask(task) : addTask(task);
    setTask({ name: '', priority: 'Medium', status: 'To Do', dueDate: '', image: null });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="taskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control as="select" name="priority" value={task.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" name="status" value={task.status} onChange={handleChange}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="taskImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* Tampilkan preview gambar jika ada */}
            {task.image && <img src={task.image} alt="Task" style={{ width: '100%', marginTop: '10px' }} />}
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            {taskToEdit ? 'Save Changes' : 'Add Task'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
