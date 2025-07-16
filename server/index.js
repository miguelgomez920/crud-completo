  // ======================= IMPORTACIONES =======================
  const express =  require('express');
  const productoRoutes = require("./routes/productoRoutes.js");
  const authRoutes = require("./routes/authRoutes.js");
  const cors = require('cors');
  require('dotenv').config(); // Permite usar variables de entorno desde un archivo .env

  // ======================= CONFIGURACIÓN DEL SERVIDOR =======================
  const app = express();

  // ======================= MIDDLEWARES =======================

  app.use(cors()); // Es importante poner esta de primera para que primero se pueda hacer la comunicacion entre diferentes dominios
  app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones

  // Rutas principales para los recursos de la API
  app.use("/api/productos", productoRoutes); // si la url termina tiene est ruta /api/productos, entonces lo redirecciona a el archivo productoRoutes NOTA: dejamos el /api ya que esto permite distinguir claramente las rutas del backend de las del frontend.
  app.use("/api/auth", authRoutes); // si la url termina tiene est ruta /api/auth, entonces lo redirecciona a el archivo authRoutes

  // Ruta raíz opcional (útil para probar que el backend funciona)
  app.get("/", (req, res) => {
    res.send("🛠️ API de productos corriendo correctamente");
  });

  // ======================= INICIO DEL SERVIDOR =======================

  // Usa el puerto definido en el archivo .env o por defecto el 3002
  const PORT = process.env.PORT || 3002;

  // Inicia el servidor en el puerto indicado
  app.listen(PORT, ()=> {
      console.log(`servidor iniciado en http://localhost:${PORT}`);
  });