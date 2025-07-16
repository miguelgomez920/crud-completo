// ======================= IMPORTACIONES =======================
const express = require("express");
const router = express.Router(); // Instancia del enrutador de Express

// Controlador que contiene la lógica para login y registro
const authController = require("../controllers/authController");

// Middlewares de validación para las rutas de autenticación
const { validacionRegistro, validacionLogin} = require("../middlewares/validacionesAuth");

// ======================= RUTAS DE AUTENTICACIÓN =======================
router.post("/login", validacionLogin, authController.login); //primero se ejecuta el middleware validacionRegistro y ya en el controller obtenemos los errores (si los tuvo) con validacionResutl(req)
router.post("/register", validacionRegistro, authController.register); 

module.exports = router;