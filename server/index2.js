//index con malas practicas (sin separar responsabilidades)

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

//coneccion mysql
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud",
    port: 3306,
});




//endpoints
//post
app.post("/create", (req,res)=>{
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const cantidad = req.body.cantidad;
    const descripcion = req.body.descripcion;

    db.query('INSERT INTO productos(nombre, precio, categoria, cantidad, descripcion) VALUES (?,?,?,?,?)', [nombre, precio, categoria, cantidad, descripcion], 
        (err, result)=>{
            if (err) {
                console.log(err);
                 res.status(500).send("Error al insertar producto");
                
            } else {
                res.send("Producto registrado con exito");             
            }    
    })

})

//get
app.get("/productos", (req,res)=>{

    db.query("SELECT * FROM productos", (err, result)=>{
        if(err){
                res.status(500).send("NO se pudo mostrar los productos");
        }else{
            res.send(result);
        }
        
    })

})

//put
app.put("/update", (req, res)=>{

    const { nombre, precio, categoria, cantidad, descripcion, id } = req.body; //es una forma rápida y limpia de extraer propiedades específicas de un objeto en JavaScript. Esto se llama desestructuración de objetos (object destructuring).

    db.query("UPDATE productos SET nombre = ?, precio = ?, categoria = ?, cantidad = ?, descripcion = ? WHERE id = ?", [nombre, precio,  categoria, cantidad, descripcion, id], (err, result)=>{
        if (result.affectedRows === 0) {
            res.status(404).send("Producto no encontrado"); 
        } else {
            res.send("El producto se actualizo correctamente");
        }

    })
})

//delete
app.delete("/delete/:id", (req, res)=>{
    const {id} = req.params;

    db.query("DELETE FROM productos WHERE id = ?", [id], (error, result)=>{
        if(error){
            res.status(500).send("Error en el servidor")
        }else{
            res.send("El producto se elimino correctamente")
        }

    })
})  


//iniciamos el servidor
app.listen(3002, ()=>{
    console.log("Corriendo en el puerto 3002")
})