const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
 
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ msg: "No hay token, acceso denegado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = auth;




