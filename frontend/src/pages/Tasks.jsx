import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/Tasks.css";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filtros
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Cargar tareas al inicio
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener tareas");
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Crear o actualizar tarea
  const addOrUpdateTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      // Normalizar datos antes de enviar
      const payload = {
        title: task.title,
        description: task.description,
        status: task.status.toLowerCase(),
        priority: task.priority.toLowerCase(),
      };

      let res;
      if (editingTask) {
        // EDITAR
        res = await fetch(
          `http://localhost:5000/api/tasks/${editingTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error("Error al actualizar tarea");
        const updatedTask = await res.json();
        setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
        setEditingTask(null);
      } else {
        // CREAR
        res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Error al guardar tarea");
        const newTask = await res.json();
        setTasks([newTask, ...tasks]); // agregar al inicio
      }

      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert(err.message); // Para ver el error en frontend
    }
  };

  // Editar
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Eliminar
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar tarea");
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Filtrado
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="tasks-container-tasks">
      <header className="navbar-tasks">
        <div className="logo-tasks">To-Do Pixel.</div>
        <nav className="nav-links-tasks">
          <button className="btn-logout-tasks" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <main className="main-tasks">
        <h1 className="welcome-title-tasks">¡Bienvenido!</h1>
        <p className="welcome-text-tasks">¿Estás listo para gestionar tus tareas hoy?</p>

        <button className="btn-main-tasks" onClick={() => setShowForm(true)}>
          Crear nueva tarea
        </button>

        <div className="filters-tasks">
          <input
            type="text"
            placeholder="Buscar tarea..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="en progreso">En progreso</option>
            <option value="completada">Completadas</option>
          </select>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">Todas las prioridades</option>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
        </div>

        <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <footer className="footer-tasks">
        <p>© 2025 To-Do Pixel. Todos los derechos reservados.</p>
        <div className="social-links-tasks">
          <a href="https://github.com/Yenni009/Kata_Gestor_de_Tareas_Personales.git">GitHub</a>
        </div>
      </footer>

      {showForm && (
        <TaskForm
          onSave={addOrUpdateTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          editingTask={editingTask}
        />
      )}
    </div>
  );
};

export default Tasks;







