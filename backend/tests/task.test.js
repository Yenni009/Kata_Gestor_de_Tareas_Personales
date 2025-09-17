
const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Task = require("../src/models/Task");
const User = require("../src/models/User");

let token;

describe("Task API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_test");
    await User.deleteMany({});
    await Task.deleteMany({});

    // Crear usuario y obtener token
    const userRes = await request(app).post("/api/auth/register").send({
      name: "Task User",
      email: "taskuser@example.com",
      password: "123456",
    });

    token = userRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("🔹 Debería crear una tarea nueva", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Primera tarea",
        description: "Descripción de prueba",
        status: "pendiente",
        priority: "alta",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Primera tarea");
  });

  it("🔹 Debería obtener las tareas del usuario", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("🔹 Debería actualizar una tarea existente", async () => {
    const tarea = await Task.findOne({ title: "Primera tarea" });

    const res = await request(app)
      .put(`/api/tasks/${tarea._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "completada" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("completada");
  });

  it("🔹 Debería eliminar una tarea", async () => {
    const tarea = await Task.findOne({ title: "Primera tarea" });

    const res = await request(app)
      .delete(`/api/tasks/${tarea._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("msg", "Tarea eliminada correctamente");
  });
});
