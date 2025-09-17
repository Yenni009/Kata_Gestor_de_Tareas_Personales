import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, onClose, editingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "baja",     
    status: "pendiente",   
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "baja",
        status: editingTask.status || "pendiente",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <div className="modal-overlay-tasks" onClick={onClose}>
      <div
        className="modal-content-tasks"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>{editingTask ? "Editar tarea" : "Crear nueva tarea"}</h2>
        <form onSubmit={handleSubmit} className="form-tasks">
          <input
            type="text"
            name="title"
            placeholder="Título de la tarea"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
          <div className="form-buttons-tasks">
            <button type="submit" className="btn-save-tasks">
              {editingTask ? "Actualizar tarea" : "Agregar tarea"}
            </button>
            <button type="button" className="btn-cancel-tasks" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;




