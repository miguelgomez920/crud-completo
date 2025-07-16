// ======================= IMPORTACIONES =======================
const bcrypt = require("bcryptjs");   // Para hashear contraseñas
const jwt = require("jsonwebtoken");  // Para generar tokens JWT
const User = require("../models/User.js");  // Modelo de usuario (acceso a BD)
const { validationResult } = require("express-validator");  // Para manejar errores de validaciones

// ======================= CONTROLADOR DE AUTENTICACIÓN =======================

// Inicia sesion de un usuario
exports.login = (req, res) => {   //esta forma de exportar siver mas para proyectos pequeños, es diferente a como exportamos en productoController
 
  // Verifica si hubo errores de validación
  const errores = validationResult(req); //obtenemos los errores que nos dio el middleware de validacionRegistro
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() }); //le damos la cliente los errores de la validacion
  }

  const { email, password } = req.body;
  
  User.findByEmail(email, async (err, results) => { //es asincrona porque vamos a usar el await para el bcrypt
    if (err) return res.status(500).send("Error en el servidor");
    if (results.length === 0) return res.status(401).send("Usuario no encontrado"); //Si no se encuentra ningún usuario con ese correo, responde con un error 401 (no autorizado).

    const usuario = results[0]; //Extrae el primer (y único) usuario de los resultados de la consulta
    const passwordValida = await bcrypt.compare(password, usuario.password); //para verificar si la contraseña enviada (password) coincide con la contraseña hasheada almacenada en la base de datos 
    if (!passwordValida) return res.status(401).send("Contraseña incorrecta");

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Si la contraseña es válida, genera un token JWT
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });//Devuelve al frontend el token generado y los datos básicos del usuario (sin la contraseña)
  });
};


// Registra un nuevo usuario
exports.register = async (req, res) => { //es asincrona porque vamos a usar el await para el bcrypt
  // Verifica errores de validación
   const errores = validationResult(req); //obtenemos los errores que nos dio el middleware de validacionRegistro
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() }); //le damos la cliente los errores de la validacion
    }

  const { nombre, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); //Usa la librería bcrypt para encriptar (hashear) la contraseña del usuario antes de guardarla, el 10 es el número de salt rounds (rondas de sal) que se usa para encriptar la contraseña. entre mas rondas es mas seguro 
  User.create(nombre, email, hashedPassword, (err, result) => {
    if (err) {
      return res.status(500).send("Error al registrar el usuario");
    }else {
      res.status(201).send("Usuario registrado correctamente");
    }
  });
};