const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET todas las tareas del usuario
router.get("/", auth, getTasks);

// POST nueva tarea
router.post("/", auth, createTask);

// PUT actualizar tarea
router.put("/:id", auth, updateTask);

// DELETE eliminar tarea
router.delete("/:id", auth, deleteTask);

module.exports = router;

