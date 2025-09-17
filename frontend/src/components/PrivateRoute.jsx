import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Revisar si hay token
  return token ? children : <Navigate to="/login" />; // Si no hay, redirige a login
};

export default PrivateRoute;
