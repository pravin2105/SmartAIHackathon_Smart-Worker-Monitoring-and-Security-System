import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UnauthorizedArea.css";

const UnauthorizedArea = () => {
  const [areas, setAreas] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [editingArea, setEditingArea] = useState(null);

  // Fetch available cameras and unauthorized areas on component mount
  useEffect(() => {
    fetchCameras();
    fetchUnauthorizedAreas();
  }, []);

  // Fetch all available cameras
  const fetchCameras = () => {
    axios
      .get("http://localhost:5000/api/cameras")
      .then((response) => setCameras(response.data))
      .catch((error) => console.error("Error fetching cameras:", error.message));
  };

  // Fetch all unauthorized areas
  const fetchUnauthorizedAreas = () => {
    axios
      .get("http://localhost:5000/api/unauthorized-areas")
      .then((response) => setAreas(response.data))
      .catch((error) => console.error("Error fetching unauthorized areas:", error.message));
  };

  // Add or update an unauthorized area
  const handleAddOrUpdateArea = () => {
    if (selectedCamera && coordinates) {
      const coordsArray = coordinates
        .split(",")
        .map((coord) => parseInt(coord.trim(), 10));

      if (coordsArray.length < 3 || coordsArray.some(isNaN)) {
        alert("Please provide at least three valid integer coordinates.");
        return;
      }

      if (editingArea) {
        // Update existing area
        axios
          .put(`http://localhost:5000/api/unauthorized-areas/${editingArea.id}`, {
            camera_name: selectedCamera,
            coordinates: coordsArray,
          })
          .then(() => {
            fetchUnauthorizedAreas();
            resetForm();
          })
          .catch((error) => console.error("Error updating area:", error.message));
      } else {
        // Add new area
        axios
          .post("http://localhost:5000/api/unauthorized-areas/add", {
            camera_name: selectedCamera,
            coordinates: coordsArray,
          })
          .then((response) => {
            setAreas([
              ...areas,
              { id: response.data.id, camera_name: selectedCamera, coordinates: coordsArray },
            ]);
            resetForm();
          })
          .catch((error) => console.error("Error adding area:", error.message));
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Delete an unauthorized area
  const handleDeleteArea = (id) => {
    if (window.confirm("Are you sure you want to delete this area?")) {
      axios
        .delete(`http://localhost:5000/api/unauthorized-areas/${id}`)
        .then(() => setAreas(areas.filter((area) => area.id !== id)))
        .catch((error) => console.error("Error deleting area:", error.message));
    }
  };

  // Edit an existing unauthorized area
  const handleEditArea = (area) => {
    setEditingArea(area);
    setSelectedCamera(area.camera_name);
    setCoordinates(area.coordinates.join(", "));
    setShowForm(true);
  };

  // Reset form inputs
  const resetForm = () => {
    setEditingArea(null);
    setSelectedCamera("");
    setCoordinates("");
    setShowForm(false);
  };

  return (
    <div className="unauthorized-area-container">
      <h1>Unauthorized Areas</h1>
      <button onClick={() => setShowForm(true)}>
        {editingArea ? "Edit Area" : "Add Area"}
      </button>

      {/* Form for adding or editing an area */}
      {showForm && (
        <form>
          <label>
            Select Camera:
            <select value={selectedCamera} onChange={(e) => setSelectedCamera(e.target.value)}>
              <option value="">Select Camera</option>
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.camera_name}>
                  {camera.camera_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Enter Coordinates:
            <input
              type="text"
              placeholder="E.g., 1, 2, 3, 4"
              value={coordinates}
              onChange={(e) => setCoordinates(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleAddOrUpdateArea}>
            {editingArea ? "Update" : "Add"}
          </button>
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}

      {/* List of unauthorized areas */}
      <ul>
        {areas.map((area) => (
          <li key={area.id}>
            <strong>{area.camera_name}:</strong> {area.coordinates.join(", ")}
            <button onClick={() => handleEditArea(area)}>Edit</button>
            <button onClick={() => handleDeleteArea(area.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnauthorizedArea;
