
const request = require("supertest");
const app = require("../src/app"); 
const mongoose = require("mongoose");
const User = require("../src/models/User");

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo_test");
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("🔹 Debería registrar un usuario nuevo", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("🔹 Debería iniciar sesión con usuario registrado", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("🔸 No debería loguear con credenciales inválidas", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("msg");
  });
});
