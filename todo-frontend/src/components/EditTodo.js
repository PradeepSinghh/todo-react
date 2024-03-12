// src/components/EditTodo.js
import React, { useState } from 'react';

const EditTodo = ({ todo, onSave, onCancel }) => {
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const [updatedDesc, setUpdatedDesc] = useState(todo.desc);

  const handleSave = () => {
    onSave(todo.id, { title: updatedTitle, desc: updatedDesc });
  };

  return (
    <div>
      <label>Title:</label>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <label>Description:</label>
      <input
        type="text"
        value={updatedDesc}
        onChange={(e) => setUpdatedDesc(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditTodo;
