const mysql = require('mysql');
require('dotenv').config(); // Asegura que puedes acceder a variables desde .env

const db = mysql.createConnection({

    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD   ,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Abrimos la conexión con la base de datos (podria no abrirla y al usar db.query la conexion se abre sola pero es buena practica conectarla desde el principio)
db.connect((err) => {

    // Si ocurre un error al intentar conectar, lanza ese error
    if(err){
        console.error("❌ Error al conectar con MySQL:", err.message);
        throw err;
    }

    // Si la conexión es exitosa, muestra este mensaje en consola
    console.log('Conexion a MySQL Exitosa');

});

//exportamos db
module.exports = db;