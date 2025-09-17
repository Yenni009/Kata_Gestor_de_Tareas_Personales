const dotenv = require("dotenv");
dotenv.config();

console.log("JWT_SECRET cargado:", process.env.JWT_SECRET); 

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth"); 
const taskRoutes = require("./routes/tasks"); 

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;



