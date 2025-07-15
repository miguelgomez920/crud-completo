const producto = require("../models/Producto.js")


module.exports = {  //Para proyectos medianos o grandes es mejor usar esta forma de poder exportar estas funciones 

    getProductos : (req, res)=>{

        producto.getProductos((err, result)=>{

            if (err) {
                res.status(500).json({
                success: false,
                message: "Error al obtener los productos",
                error: err
                });
            } else {
                res.status(200).send(result)
            }

        });
      
    },

    postProducto : (req, res)=> {
        const {nombre, precio, categoria, cantidad, descripcion} = req.body;
        
        producto.postProducto(nombre, precio, categoria, cantidad, descripcion,(err, result)=>{
                if (err) {
                    res.status(500).send("No se pudo insertar el producto")  
                } else {
                    res.status(201).send("Producto insertado correctamente")
                }
        });
    },

    putProducto : (req, res)=>{
        const id = req.params.id;
        const {nombre, precio, categoria, cantidad, descripcion} = req.body;

        producto.putProducto(nombre, precio, categoria, cantidad, descripcion, id, (err, result)=>{
                if (err) {
                    res.status(500).send("No se pudo actualizar el producto")
                } else {
                    res.status(200).send("El producto fue actualizado con exito!!")  
                }
        })

    },

    deleteProducto : (req, res)=>{
        const {id} = req.params;
        producto.deleteProducto(id, (err, result)=>{
            if (err) {
                res.status(500).send("No se pudo eliminar el producto");
            } else {
                res.send("Producto eliminado con exito!!");
            }
        })
    }
}