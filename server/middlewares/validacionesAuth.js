const { body } = require("express-validator");

exports.validacionRegistro = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("email").isEmail().withMessage("El correo electrónico no es válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener mínimo 6 caracteres")
];

exports.validacionLogin = [
  body("email").isEmail().withMessage("El correo no es válido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria")
];