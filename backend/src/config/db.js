const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Evita que Render se quede colgado
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error al conectar MongoDB:", error.message);

    // ❗ Importante para Render: NO usar process.exit()
    // Render reinicia el servicio si falla, así que no lo cierres manualmente.
  }
};

module.exports = connectDB;
