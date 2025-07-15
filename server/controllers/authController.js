const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.login = (req, res) => {   //esta forma de exportar siver mas para proyectos pequeños, es diferente a como exportamos en productoController
  const { email, password } = req.body;
  
  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).send("Error en el servidor");
    if (results.length === 0) return res.status(401).send("Usuario no encontrado");//Si no se encuentra ningún usuario con ese correo, responde con un error 401 (no autorizado).

    const usuario = results[0]; //Extrae el primer (y único) usuario de los resultados de la consulta
    const passwordValida = await bcrypt.compare(password, usuario.password); //para verificar si la contraseña enviada (password) coincide con la contraseña hasheada almacenada en la base de datos 
    if (!passwordValida) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" }); //firmamos o protegemos con una clave segura
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });//Devuelve al frontend el token generado y los datos básicos del usuario (sin la contraseña)
  });
};

exports.register = async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create(nombre, email, hashedPassword, (err, result) => {
    if (err) return res.status(500).send("Error al registrar el usuario");
    res.status(201).send("Usuario registrado correctamente");
  });
};