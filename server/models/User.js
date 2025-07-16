const db = require("../db/dbConfig");

//En tu código se utiliza un objeto literal para definir el modelo User porque es una forma sencilla y efectiva cuando
// solo necesitas funciones estáticas que no dependen de instancias ni tienen estado interno. Esta estructura es muy 
// común en proyectos pequeños o cuando solo se requiere agrupar funciones relacionadas, como consultas a la base de datos. 
// No se usa una clase porque en este caso no es necesario; usar una clase solo tendría sentido si planeas agregar más lógica, 
// herencia, o necesitas crear instancias con propiedades. Ambos enfoques son válidos, y elegir uno u otro depende de la 
// complejidad y escala del proyecto.

//objeto literal qeu contienen las funciones, donde la clave es el nombre de la funcion y el valor es la funcion, que en este caso es una funcion flecha
const User = {

  // Busca un email
  findByEmail: (email, callback) => {
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], callback);
  },

  // Ingresa un nuevo usuario a la base de datos
  create: (nombre, email, hashedPassword, callback) => {
    db.query("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hashedPassword], callback);
  }
};

module.exports = User;