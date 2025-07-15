const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("No hay token");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Token inválido");
    req.user = decoded; //Si todo está bien, guarda los datos decodificados (por ejemplo: { id, email }) en req.user, para que los controladores siguientes puedan usar esa información del usuario autenticado.
    next(); //Llama a next() para que Express pase al siguiente middleware o al controlador de la ruta protegida.
  });
};

module.exports = verifyToken;

//se observa que no usamos el ifelse ya que estamos usando el return temprano para mejora la claridad del código y la simplicidad.