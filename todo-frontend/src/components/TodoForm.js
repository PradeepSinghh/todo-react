// src/components/TodoForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();

  const addTodoAsync = async () => {
    try {
      console.log('Adding todo...');
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title,
        desc,
        completed: false,
      });

      console.log('Todo added:', response.data);
      dispatch(addTodo(response.data));
      setTitle('');
      setDesc('');
    } catch (error) {
      console.error('Error adding todo:', error.message);
      console.error('Error details:', error.response ? error.response.data : 'No response');

      if (error.response && error.response.data && error.response.data.error && error.response.data.error.details) {
        console.error('Validation details:', error.response.data.error.details);
      }
    }
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <label>Title:</label>
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        placeholder="Enter todo description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={addTodoAsync}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
