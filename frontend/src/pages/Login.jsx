import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error en el login");

      
      localStorage.setItem("token", data.token);

      setMessage("Inicio de sesión exitoso");
      setError(false);
      setFormData({ email: "", password: "" });

      // Redirigir a página protegida 
      navigate("/tasks");
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

  return (
    <div className="register-container">
      <header className="navbar">
        <div className="logo">To-Do Pixel.</div>
        <nav className="nav-links">
          <button className="btn-back" onClick={handleBack}>
            Volver
          </button>
        </nav>
      </header>

      <main className="register-main">
        <div className="form-container">
          <h1>Iniciar Sesión</h1>
          <p>Ingresa tus credenciales para acceder a tu cuenta.</p>

          <form className="register-form" onSubmit={handleSubmit}>
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
              {loading ? "Ingresando..." : "Iniciar Sesión"}
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
          <a href="https://github.com/Yenni009/Kata_Gestor_de_Tareas_Personales.git">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;

