const db = require("../db/dbConfig.js")

class Producto{

    //METODOS

    getProductos(callback){
            const sql = "SELECT * FROM productos";
            db.query(sql, callback );
    }

    postProducto(nombre, precio, categoria, cantidad, descripcion, callback){
        const sql = "INSERT INTO productos (nombre, precio, categoria, cantidad, descripcion) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [nombre, precio, categoria, cantidad, descripcion], callback);
    }

    putProducto(nombre, precio, categoria, cantidad, descripcion, id, callback){
        const sql = "UPDATE productos SET nombre = ?, precio = ?, categoria = ?, cantidad = ?, descripcion = ? WHERE id = ?";
        db.query(sql, [nombre, precio, categoria, cantidad, descripcion, id], callback)
    }

    deleteProducto(id, callback){
        const sql = "DELETE FROM productos WHERE id = ?";
        db.query(sql, [id], callback);
    }

}

module.exports = new Producto();

