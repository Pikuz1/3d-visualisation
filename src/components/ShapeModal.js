import React, { useState } from 'react';
import '../App.css';

const ShapeModal = ({ addShape, closeModal }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState(''); // State to track selected shape type

  const handleSubmit = () => {
    if (name && type) {
      addShape({ name, type });
      closeModal(); // Close the modal after shape creation
    }
  };

  return (
    <div className="modal">
      <h3>Create Modal</h3>
      <div>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Shape Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Shape Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>Select a shape</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
          <option value="cube">Cube</option>
          <option value="cone">Cone</option>
        </select>
      </div>
      <div className="modal-buttons">
        <button onClick={handleSubmit}>Create</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default ShapeModal;
