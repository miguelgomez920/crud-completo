// ======================= IMPORTACIONES =======================
import './ProductosPage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2"; // Para mostrar alertas estilizadas

// Servicios para manejar operaciones HTTP con productos
import {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProductoById
} from '../../services/ProductosService.js';

// Componentes reutilizables
import TablaProductos from '../../components/TablaProductos/TablaProductos.js';
import InputFormulario from '../../components/InputFormulario/InputFormulario.js';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario.js';

// ======================= COMPONENTE PRINCIPAL =======================
function ProductosPage(){

 // --------------------- ESTADOS ---------------------
const [nombre, setNombre] = useState("");
const [precio, setPrecio] = useState("");
const [categoria, setCategoria] = useState("");
const [cantidad, setCantidad] = useState("");
const [descripcion, setDescripcion] = useState("");
const [id, setId] = useState("");

// Lista o array de productos
const [productosArray, setProductos ] = useState([]);

//array headers  para los encabezados para la tabla de productos
const headers = ["ID", "Nombre", "Precio", "Categoría", "Cantidad", "Descripción", "Acciones"];

// Control del botón de editar
const [botonEditar, setBotonEditar] = useState(false);

//Estado de carga (loading)
const [loading, setLoading] = useState(false);

// Hook que carga los productos cuando se ejecuta el componente funcional App.js, solo carga a los productos una vez, para que no lo haga cada que se renderize el componente al cambiar un estado o poner otro prop
useEffect(()=>{
    getProductos();
}, []);


 // ======================= FUNCIONES =======================

 //Carga los datos de un producto seleccionado en los inputs
const editarProducto = (elemento)=>{
  setBotonEditar(true);
  setNombre(elemento.nombre);
  setPrecio(elemento.precio);
  setCategoria(elemento.categoria);
  setCantidad(elemento.cantidad);
  setDescripcion(elemento.descripcion);
  setId(elemento.id);
  console.log(elemento);
}


//Valida que los campos del formulario sean correctos (función reutilizable )
const validarCampos = ()=>{
  return( //Queremos que el resultado de esa expresión (true o false) sea el valor devuelto por la función.
    nombre.trim() &&
      !isNaN(precio) && precio > 0 && precio <= 99999999.99 &&
      !isNaN(cantidad) && cantidad >= 0 &&
      categoria.trim() &&
      descripcion.trim()
  );
};

//limpia los campos del formulario
const limpiarCampos = ()=>{
  setNombre("");
  setPrecio("");
  setCategoria("");
  setCantidad("");
  setDescripcion("");
  setId("");
  setBotonEditar(false);
}

//Obtiene todos los producto desde el backend (get)
const getProductos = () => {
    getAllProductos()
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se logró mostrar los productos",
          footer: error.message
        });
      });
  };


//Crea un nuevo producto enviando los datos al backend (post)
const postProductos = ()=>{
  if(!validarCampos()){
    alert("Por favor ingrese todos los campos correctamente");
      return; //terminamos de ejecutar el programa
  }

  setLoading(true);

  const nuevoProducto = {
      nombre: nombre.trim(),
      precio: Number(precio),
      categoria: categoria.trim(),
      cantidad: Number(cantidad),
      descripcion: descripcion.trim(),
  };

  createProducto(nuevoProducto)
  .then((response)=>{
      getProductos();
      limpiarCampos();
       Swal.fire({
          title: "<strong>Registro exitoso!!!</strong>",
          html: `<i>El producto <strong>${nombre}</strong> fue registrado con éxito</i>`,
          icon: "success",
          timer: 3000,
        });
  })
  .catch((error)=>{
    Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro insertar el producto!",
              footer: error.message             
            });
  })
  .finally(() => setLoading(false));
};


//Actualiza un producto existente en el backend (put)
const putProductos = async()=>{
  if(!validarCampos()){
      alert("Por favor ingrese todos los campos correctamente");
        return; //terminamos de ejecutar el programa
    }

  const productoActualizado = {
     nombre: nombre.trim(),
      precio: Number(precio),
      categoria: categoria.trim(),
      cantidad: Number(cantidad),
      descripcion: descripcion.trim(),
      id: id
  }

  try {
    await updateProducto(id, productoActualizado);
     Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: `<i>El producto <strong>${nombre}</strong> fue actualizado con éxito</i>`,
        icon: "success",
        timer: 3000,
      });
      getProductos();
      limpiarCampos();
      setBotonEditar(false);   
  } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró actualizar el producto",
        footer: error.message
      });
  }
}

//Elimina un producto por su ID (delete)
const deleteProducto = (elemento)=>{
      setId("");
      Swal.fire({
        title: "Confirmar eliminado",
        html:"<i>¿Realmente desea eliminar a <strong>" + elemento.nombre + "</strong>?</i>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminarlo!",
      }).then((result)=>{
      if (result.isConfirmed) {
        deleteProductoById(elemento.id) //en este caso enviamos el id en los parametros del url y no como un JSON
          .then(() => {
            getProductos();
            limpiarCampos(); //para evitar intentar actualizar un empleado que ya fue eliminado.
            
            Swal.fire({
              html: "<strong>" + elemento.nombre + "</strong> fue eliminado",
              icon: "success",
              timer: 3000,
            });
          }).catch((error)=>{
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logro eliminar el producto!",
                footer: error.message               
            });
          })
          }
       })
}


  // ======================= RENDER (JSX) ======================= 
    return (

      <div className='container__productos'>

      
          <Link to="/homepage" >  
            <button className='regresar'>Regresar</button>
          </Link>

          <h1 className='titulo__productos'>GESTIONAR PRODUCTOS</h1>

          <div className='card'>
            <div className='formulario'>

              <InputFormulario
              id = "nombre"
              label = "Nombre: "
              type = "text"
              value = {nombre}
              onChange = {setNombre}
              placeholder = "Ingrese el nombre del producto"
              />

              <InputFormulario
              id = "precio"
              label = "Precio: "
              type = "number"
              value = {precio}
              onChange = {setPrecio}
              placeholder = "Ingrese el precio del producto"
              />

              <InputFormulario
              id = "categoria"
              label = "Categoria: "
              type = "text"
              value = {categoria}
              onChange = {setCategoria}
              placeholder = "Ingrese la categoria del producto"
              />

              <InputFormulario
              id = "cantidad"
              label = "Cantidad: "
              type = "number"
              value = {cantidad}
              onChange = {setCantidad}
              placeholder = "Ingrese la cantidad de productos"
              />

              <InputFormulario
              id = "descripcion"
              label = "Descripcion: "
              type = "text"
              value = {descripcion}
              onChange = {setDescripcion}
              placeholder = "Ingrese la descripcion del producto"
              />

              <BotonFormulario 
              botonEditar={botonEditar}
              putProductos={putProductos}
              limpiarCampos={limpiarCampos}
              postProductos={postProductos}
              loading={loading}
              />

              </div>

              <TablaProductos   
              headers={headers}       
              productosArray = {productosArray}
              editarProducto= {editarProducto}
              idEditando={id} // aquí le pasas el id del producto que se está editando
              deleteProducto= {deleteProducto}       
              />

          </div>

      </div>

       
    );



  // JSX pero sin usar componentes reutilizables
  // return (
  //   <div className="App">

  //     <div className='contenedor'>

  //       <div className='formulario'>
  //         <label>Nombre: <input type='text'
  //         value={nombre}
  //         onChange={(event)=>{setNombre(event.target.value)}} 
  //         placeholder='Ingrese el nombre del producto'></input></label>
         
  //         <label>Precio: <input type='number' 
  //         value={precio}
  //         onChange={(event)=>{setPrecio(event.target.value)}} 
  //         placeholder='Ingrese el precio del producto'></input></label>
          
  //         <label>Categoria: <input type='text' 
  //         value={categoria}
  //         onChange={(event)=>{setCategoria(event.target.value)}} 
  //         placeholder='Ingrese la categoria del producto'></input> </label>
          
  //         <label>Cantidad: <input type='number' 
  //         value={cantidad}
  //         onChange={(event)=>{setCantidad(event.target.value)}} 
  //         placeholder='Ingrese la cantidad del producto'></input> </label>
          
  //         <label>Descripcion: <input type='text'  
  //         value={descripcion}
  //         onChange={(event)=>{setDescripcion(event.target.value)}} 
  //         placeholder='Ingrese la descripcion del producto'></input> </label>
  //         {botonEditar ? (
  //           <div className='botonesEditar'>
  //             <button
  //             onClick={()=>{putProductos()}} 
  //             style={{backgroundColor:"yellow", color:"black"}}>Actualiza</button>
  //             <button 
  //             onClick={()=>{limpiarCampos()}}
  //             style={{backgroundColor:"red", color:"black"}}>Cancelar</button>
  //           </div>
  //         ) : (
  //           <button onClick={postProductos} disabled={loading} >{loading ? "Registrando..." : "Registrar producto"}</button> //usamos disable para deshabilitar temporalmente el boton cuando loading es true ()
  //         )}
          
          
  //       </div>

  //       <table border="1">
  //             <thead>
  //               <tr>
  //                 <th>ID</th>
  //                 <th>Nombre</th>
  //                 <th>Precio</th>
  //                 <th>Categoría</th>
  //                 <th>Cantidad</th>
  //                 <th>Descripcion</th>
  //                 <th>Acciones</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {productosArray.map((elemento, index) => {
  //             return(
  //                   <tr key={elemento.id}>
  //                     <td>{elemento.id}</td>
  //                     <td>{elemento.nombre}</td>
  //                     <td>{elemento.precio}</td>
  //                     <td>{elemento.categoria}</td>
  //                     <td>{elemento.cantidad}</td>
  //                     <td className='descripcion'>{elemento.descripcion}</td>
  //                     <td className="acciones">
  //                     <button className='editar' onClick={()=>{editarProducto(elemento)}}>Editar</button>
  //                     <button className='eliminar' onClick={()=>{deleteProducto(elemento)}}>Eliminar</button>
  //                     </td>
  //                   </tr>
  //               )    
  //               })}                                                                                                              
  //             </tbody>
  //       </table>
          
  //     </div>
   

  //   </div>
  // );

    
}

export default ProductosPage;


    