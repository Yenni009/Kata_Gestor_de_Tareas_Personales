import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://kata-gestor-de-tareas-personales.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Error en el registro");

      setMessage("Registro exitoso, redirigiendo...");
      setError(false);
      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setMessage(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <header className="navbar">
        <div className="logo">To-Do Pixel.</div>
        <nav className="nav-links">
          <button className="btn-login" onClick={handleLogin}>Iniciar Sesión</button>
          <button className="btn-back" onClick={handleBack}>Volver</button> 
        </nav>
      </header>

      <main className="register-main">
        <div className="form-container">
          <h1>Crear cuenta</h1>
          <p>Regístrate para empezar a organizar tus tareas.</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn-main" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>

            {message && (
              <p
                style={{
                  color: error ? "red" : "green",
                  marginTop: "10px",
                  fontWeight: "500",
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 To-Do Pixel. Todos los derechos reservados.</p>
        <div className="social-links">
          <a href="https://github.com/Yenni009/Kata_Gestor_de_Tareas_Personales.git">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default Register;







