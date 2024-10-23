import React, { useState } from 'react';
import './App.css';
import ShapeTable from './components/ShapeTable';
import ShapeCanvas from './components/ShapeCanvas';

const App = () => {
  const [shapes, setShapes] = useState(JSON.parse(localStorage.getItem('shapes')) || []);
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [renderedShapeIndex, setRenderedShapeIndex] = useState(null);

  const addShape = (shape) => {
    const newShapes = [...shapes, shape];
    setShapes(newShapes);
    localStorage.setItem('shapes', JSON.stringify(newShapes));
  };

  const removeShape = (index) => {
    const updatedShapes = shapes.filter((_, i) => i !== index);
    setShapes(updatedShapes);
    localStorage.setItem('shapes', JSON.stringify(updatedShapes));
  };

  const renderShapes = (index = null) => {
    setRenderedShapeIndex(index);
    setCanvasVisible(true);
  };

  const closeCanvas = () => {
    setCanvasVisible(false);
    setRenderedShapeIndex(null);
  };

  return (
    <div>
      {isCanvasVisible ? (
        <div className="canvas-container">
          <button className="close-button" onClick={closeCanvas}>X</button>
          <ShapeCanvas shapes={renderedShapeIndex !== null ? [shapes[renderedShapeIndex]] : shapes} />
        </div>
      ) : (
        <div className="table-container">
          <ShapeTable shapes={shapes} addShape={addShape} removeShape={removeShape} renderShape={renderShapes} />
          <button onClick={() => renderShapes()}>Render All Shapes</button>
        </div>
      )}
    </div>
  );
};

export default App;
