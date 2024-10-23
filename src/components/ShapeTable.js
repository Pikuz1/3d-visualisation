import React, { useState } from 'react';
import '../App.css';
import ShapeModal from './ShapeModal';

const ShapeTable = ({ shapes, addShape, removeShape, renderShape }) => {
  const [open, setOpen] = useState(false);

  const handleCreateShape = () => {
    setOpen(true);
  };

  return (
    <div>
      <button onClick={handleCreateShape}>Create</button>
      {open && (
        <div className="modal">
          <ShapeModal addShape={addShape} closeModal={() => setOpen(false)} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Shape Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shapes.map((shape, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{shape.name}</td>
              <td>{shape.type}</td>
              <td>
                <button onClick={() => renderShape(index)}>Render</button>
                <button onClick={() => removeShape(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShapeTable;
