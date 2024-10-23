import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import '../App.css';

const ShapeCanvas = ({ shapes }) => {
  const canvasRef = useRef();
  const [selectedShape, setSelectedShape] = useState(null); // Track the selected shape
  const [shapeProperties, setShapeProperties] = useState({ name: '', scale: { x: 1, y: 1, z: 1 }, position: { x: 0, y: 0, z: 0 } });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set camera to default position at the center of the scene
    camera.position.z = 10;
    camera.lookAt(0, 0, 0);

    // Add ambient and point light to the scene for shading
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Soft ambient light
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100); // Strong point light
    pointLight.position.set(10, 10, 10); // Adjust the position of the point light
    scene.add(ambientLight);
    scene.add(pointLight);

    // Create and add 3D shapes to the scene
    const shapeMeshes = shapes.map((shape, index) => {
      let geometry;
      switch (shape.type) {
        case 'cube':
          geometry = new THREE.BoxGeometry(2, 2, 2); // Cube with width, height, and depth
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(1.5, 32, 32); // Sphere with radius and segments
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 3, 32); // Cylinder with radius and height
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(1.5, 3, 32); // Cone with radius and height
          break;
        default:
          geometry = new THREE.BoxGeometry(2, 2, 2); // Default to cube
      }

      // Apply the custom hex color (#6e11f7) to the shapes
      const material = new THREE.MeshPhongMaterial({ color: 0x6e11f7, shininess: 100 });
      const mesh = new THREE.Mesh(geometry, material);

      // Set the position of the mesh, spacing them apart on the x-axis
      mesh.position.x = index * 4; // Space each shape 4 units apart

      scene.add(mesh);

      // Make the shape clickable
      mesh.userData = { name: shape.name }; // Store shape name in user data for click detection

      return mesh; // Return the mesh to apply animation/rotation later
    });

    // Raycaster to detect clicks on shapes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Function to detect clicks on the canvas
    const onMouseClick = (event) => {
      // Calculate the mouse position in normalized device coordinates
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the raycaster with the current mouse position and camera
      raycaster.setFromCamera(mouse, camera);

      // Check if any shapes are intersected
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        // Get the first intersected object
        const selectedMesh = intersects[0].object;
        const shapeName = selectedMesh.userData.name;

        // Set the selected shape and its properties
        setSelectedShape(selectedMesh);
        setShapeProperties({
          name: shapeName,
          scale: selectedMesh.scale,
          position: selectedMesh.position,
        });
      }
    };

    window.addEventListener('click', onMouseClick);

    // Animation loop to rotate the objects for a more obvious 3D effect
    const animate = () => {
      requestAnimationFrame(animate);

      // Apply rotation to each shape for 3D visualization
      shapeMeshes.forEach((mesh) => {
        mesh.rotation.x += 0.01; // Rotate around the x-axis
        mesh.rotation.y += 0.01; // Rotate around the y-axis
      });

      renderer.render(scene, camera);
    };

    animate();
    
    return () => {
      // Clean up event listener when component unmounts
      window.removeEventListener('click', onMouseClick);
    };
  }, [shapes]);

  // Function to update shape scale and position based on input
  const updateShapeProperties = (property, value, axis) => {
    if (selectedShape) {
      if (property === 'scale') {
        selectedShape.scale[axis] = value;
        setShapeProperties((prev) => ({
          ...prev,
          scale: { ...prev.scale, [axis]: value },
        }));
      } else if (property === 'position') {
        selectedShape.position[axis] = value;
        setShapeProperties((prev) => ({
          ...prev,
          position: { ...prev.position, [axis]: value },
        }));
      }
    }
  };

  return (
    <div>
      <div className="shape-info">
        <h3>Selected Shape: {shapeProperties.name}</h3>
        {selectedShape && (
          <div>
            <div>
              <label>Scale X: </label>
              <input
                type="number"
                value={shapeProperties.scale.x}
                onChange={(e) => updateShapeProperties('scale', parseFloat(e.target.value), 'x')}
              />
              <label>Scale Y: </label>
              <input
                type="number"
                value={shapeProperties.scale.y}
                onChange={(e) => updateShapeProperties('scale', parseFloat(e.target.value), 'y')}
              />
              <label>Scale Z: </label>
              <input
                type="number"
                value={shapeProperties.scale.z}
                onChange={(e) => updateShapeProperties('scale', parseFloat(e.target.value), 'z')}
              />
            </div>
            <div>
              <label>Position X: </label>
              <input
                type="number"
                value={shapeProperties.position.x}
                onChange={(e) => updateShapeProperties('position', parseFloat(e.target.value), 'x')}
              />
              <label>Position Y: </label>
              <input
                type="number"
                value={shapeProperties.position.y}
                onChange={(e) => updateShapeProperties('position', parseFloat(e.target.value), 'y')}
              />
              <label>Position Z: </label>
              <input
                type="number"
                value={shapeProperties.position.z}
                onChange={(e) => updateShapeProperties('position', parseFloat(e.target.value), 'z')}
              />
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default ShapeCanvas;
