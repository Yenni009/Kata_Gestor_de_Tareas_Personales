import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card-tasks">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        <strong>Prioridad:</strong> {task.priority}
      </p>
      <p>
        <strong>Estado:</strong> {task.status}
      </p>
      <p>
        <strong>Fecha:</strong>{" "}
        {task.createdAt
          ? new Date(task.createdAt).toLocaleDateString()
          : "Sin fecha"}
      </p>
      <div className="task-actions-tasks">
        <button className="btn-edit-tasks" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button className="btn-delete-tasks" onClick={() => onDelete(task._id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;



