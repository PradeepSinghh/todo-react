import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/todos?page=${page}`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page]);

  const handleUpdate = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
  };

  const handleSaveUpdate = async (id, updatedData) => {
    try {
      // Ensure the completed property is included in the data
      const dataToSend = { ...updatedData, completed: false };

      const response = await axios.put(`http://localhost:3000/todos/${id}`, dataToSend);
      // Refresh the todo list after updating a todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo))
      );
      setEditTodo(null); // Reset the edit state
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Error updating todo:', error);

      if (error.response && error.response.data && error.response.data.error) {
        console.log('Validation errors:', error.response.data.error);
      }
    }
  };


  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`http://localhost:3000/todos/${id}`, {
        completed: !currentStatus,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !currentStatus } : todo))
      );
      console.log('Toggle status successful:', response.data);
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };


  return (
    <div>
      <h2>Todo List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <strong>{todo.title}</strong>
                <p>{todo.desc}</p>
                <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                <button onClick={() => handleUpdate(todo.id)}>Edit</button>
                <button onClick={() => handleToggleStatus(todo.id, todo.completed)}>
                  Completed Status
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
          {editTodo && (
            <EditTodo
              todo={editTodo}
              onSave={(id, updatedData) => handleSaveUpdate(id, updatedData)}
              onCancel={() => setEditTodo(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
