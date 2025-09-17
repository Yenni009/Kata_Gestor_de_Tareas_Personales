const Task = require("../models/Task");

//  Crear tarea 
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    // Validar que haya usuario autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Usuario no autenticado" });
    }

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      user: req.user.id, 
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Error al crear tarea:", err);
    res.status(500).json({ msg: "Error al crear la tarea" });
  }
};

//  Obtener todas las tareas del usuario 
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Error al obtener tareas:", err);
    res.status(500).json({ msg: "Error al obtener tareas" });
  }
};

// Actualizar tarea
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar tarea por id y usuario
    let task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    console.error("❌ Error al actualizar tarea:", err);
    res.status(500).json({ msg: "Error al actualizar tarea" });
  }
};

//  Eliminar tarea 
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar tarea por id y usuario
    const task = await Task.findOne({ _id: id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ msg: "Tarea no encontrada" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (err) {
    console.error("❌ Error al eliminar tarea:", err);
    res.status(500).json({ msg: "Error al eliminar tarea" });
  }
};


