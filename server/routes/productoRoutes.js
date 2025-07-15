const express = require('express');
const router = express.Router();
const productoController = require("../controllers/productoController.js")
const verifyToken = require("../middlewares/verifyToken.js"); // importa el middleware

//ENDPOINTS (solo un usuario con un token JWT válido podrá acceder a esas rutas.)
router.get("/", verifyToken, productoController.getProductos);           // GET /productos
//router.get("/:id", productoController.getProductoById);   // GET /productos/:id (opcional)
router.post("/", verifyToken, productoController.postProducto);          // POST /productos
router.put("/:id", verifyToken, productoController.putProducto);         // PUT /productos/:id
router.delete("/:id", verifyToken, productoController.deleteProducto);   // DELETE /productos/:id


//exportamos la variable router
module.exports = router; 