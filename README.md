
# 3D Shapes Visualization

## Project Overview

This project is a frontend web application that enables users to create, view, and interact with 3D shapes on a canvas using `React`, `Three.js`, and `Material UI`. The main objectives of this project are:
- Display a table listing all created shapes.
- Allow users to add new shapes through a modal form.
- Render the created shapes on a 3D canvas using `three.js`.
- Enable users to interact with the shapes, such as resizing or repositioning them.

## Features

- **Shape Management**: Create, delete, and manage 3D shapes stored in local storage.
- **3D Rendering**: Render shapes in a 3D canvas using `three.js`.
- **Responsive Design**: A responsive UI built using `Material UI`.
- **Persistent Data**: Shapes are saved in the browser's local storage to persist across sessions.
- **Shape Interaction**: Users can click on shapes to select them, resize them, and reposition them on the canvas by modifying their dimensions and position along the X, Y, and Z axes.

## Project Structure

- **`src/components/ShapeTable.js`**:  
  Displays a table with all created shapes, including their name, type, and actions. Users can delete or render individual shapes from this table. It also contains a button for adding a new shape, which opens the `ShapeModal`.

- **`src/components/ShapeModal.js`**:  
  Provides a modal form where users can input the name and select the type of the shape (cube, sphere, cylinder, cone). This information is passed back to the parent component to create a new shape. The modal contains validation to ensure proper inputs before shape creation.

- **`src/components/ShapeCanvas.js`**:  
  Handles the rendering of the 3D shapes in a WebGL canvas using `three.js`. It creates the scene, sets up the camera, lighting, and shape geometries, and manages their rendering on the canvas. This component also allows users to click on shapes to interact with them (resize, move).

- **`src/App.js`**:  
  The main application component that manages the overall state of the shapes (e.g., adding, deleting, rendering). It handles the user interactions with the shapes (via `ShapeCanvas` and `ShapeTable`) and passes the necessary data between components.

- **`src/index.js`**:  
  The entry point of the React application. This file renders the main `App.js` component into the DOM.

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/3d-visualisation.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd 3d-visualisation
   ```

3. **Install the dependencies**:
   Install the required dependencies using `npm`:
   ```bash
   npm install
   ```

4. **Start the development server**:
   Start the local development server:
   ```bash
   npm start
   ```

5. **Open the project in your browser**:  
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Three.js**: A JavaScript library used for 3D graphics rendering.
- **Material UI**: A React component library that provides pre-designed UI components.
- **LocalStorage**: Used to persist data across browser sessions.

## Interactions

1. **Adding Shapes**:  
   - Click the "Create Shape" button in the table to open a modal where you can provide the shape’s name and type.
   - Once the form is submitted, the new shape will be added to the table and saved in local storage.

2. **Rendering Shapes**:  
   - Click the "Render" button next to a shape in the table to render it on the 3D canvas.
   - Alternatively, click "Render All Shapes" to display all shapes on the canvas simultaneously.

3. **Selecting and Modifying Shapes**:  
   - Click on a shape in the 3D canvas to select it. When selected, the shape's name will be displayed at the top of the screen, and options will appear to change its size and move it along the X, Y, and Z axes.
   - Use the provided input fields to adjust the selected shape's dimensions or position in real time.

4. **Deleting Shapes**:  
   - Click the "Delete" button in the table next to a shape to remove it from the list and from local storage.

## Future Enhancements

- **Shape Rotation**: Add controls to allow users to rotate shapes on different axes.
- **Custom Colors**: Allow users to choose colors for individual shapes during creation.
- **Save and Load Feature**: Implement a feature to save and load shapes between sessions.
- **Multiple Shape Types**: Add more complex shapes like pyramids, torus, or custom 3D models.
- **Drag and Drop**: Implement drag-and-drop functionality to move shapes on the canvas visually.

## Contribution

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.
