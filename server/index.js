  const express =  require('express');
  const app = express();
  const productoRoutes = require("./routes/productoRoutes.js");
  const authRoutes = require("./routes/authRoutes.js");
  const cors = require('cors');

  require('dotenv').config(); // Habilita el uso de variables desde .env




  //MIDDLEWARES
  app.use(cors()); //es importante poner esta de primera para que primero se pueda hacer la comunicacion entre diferentes dominios
  app.use(express.json());
  app.use("/api/productos", productoRoutes); // Rutas para productos
  app.use("/api/auth", authRoutes);

  // Ruta raíz opcional (útil para probar que el backend funciona)
  app.get("/", (req, res) => {
    res.send("🛠️ API de productos corriendo correctamente");
  });

  // Puerto desde .env o por defecto en 3002
  const PORT = process.env.PORT || 3002;

  //iniciamos el servidor
  app.listen(PORT, ()=> {
      console.log(`servidor iniciado en http://localhost:${PORT}`);
  });