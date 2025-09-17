import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import HomeImage from "../assets/Home.jpg"; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">To-Do Pixel.</div>
        <nav className="nav-links">
          <button className="btn-login" onClick={() => navigate("/login")}>Iniciar Sesión</button>
          <button className="btn-register" onClick={() => navigate("/register")}>Registrarse</button>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-text">
          <h1>Organiza tus tareas como un profesional</h1>
          <p>
            Simplifica tu vida con nuestra aplicación de tareas. Gestiona tu
            tiempo, cumple objetivos y mantente siempre enfocado.
          </p>
          <div className="hero-buttons">
            <button className="btn-main" onClick={() => navigate("/register")}>Comenzar Ahora</button>
          </div>
        </div>

        <div className="hero-image">
          <div className="card">
            <div className="card-inner">
              {/* Frente */}
              <div className="card-front">
                <img src={HomeImage} alt="Ilustración To-Do" />
              </div>
              {/* Dorso */}
              <div className="card-back">
                <p>Cada tarea completada es un paso más cerca de tus metas...</p>
              </div>
            </div>
          </div>
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

export default Home;





