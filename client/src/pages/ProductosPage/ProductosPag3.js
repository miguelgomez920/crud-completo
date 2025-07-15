//importaciones
import './ProductosPage.css';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from "axios";
import Swal from "sweetalert2"; // Para mostrar alertas estilizadas

import TablaProductos from '../../components/TablaProductos/TablaProductos';
import InputFormulario from '../../components/InputFormulario/InputFormulario';
import BotonFormulario from '../../components/BotonFormulario/BotonFormulario';


function ProductosPage(){

//Estados
const [nombre, setNombre] = useState("");
const [precio, setPrecio] = useState("");
const [categoria, setCategoria] = useState("");
const [cantidad, setCantidad] = useState("");
const [descripcion, setDescripcion] = useState("");
const [id, setId] = useState("");

//array productos
const [productosArray, setProductos ] = useState([]);

//array headers de la tabla
const headers = ["ID", "Nombre", "Precio", "Categoría", "Cantidad", "Descripción", "Acciones"];

//boton editar
const [botonEditar, setBotonEditar] = useState(false);

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

//loading
const [loading, setLoading] = useState(false);

// Hook que carga los productos cuando se ejecuta el componente funcional App.js, solo carga a los productos una vez, para que no lo haga cada que se renderize el componente al cambiar un estado o poner otro prop
useEffect(()=>{
    getProductos();
}, []);


//Peticiones HTTP
//post
const postProductos = ()=>{

    if(!nombre.trim() ||isNaN(precio) || precio <= 0 || precio > 99999999.99 || isNaN(cantidad) || cantidad < 0 || !categoria.trim() || !descripcion.trim()){ //usamos el trim() para quitar los espacion, ya que si el cliente unicamente le da espacio a la hora de escribir en el intput, si contaria como si tuviera un valor
            alert("Por favor ingrese todos los campos")                                                                                //y isNaN suelta true si lo que esta dentro no es considerado un numero como abc o undefined
            return; //termina con la ejecucion del programa
    }

    setLoading(true);

    Axios.post( "http://localhost:3002/productos/create", {
      nombre : nombre.trim(),
      precio : Number(precio), //a pesar que precio sea en la base de datos de tipo double, en js todos los numero (decimales o enteros) son de tipo Number
      categoria : categoria.trim(),
      cantidad : Number(cantidad),
      descripcion : descripcion.trim(),
    }).then((response)=>{
            getProductos();
            limpiarCampos();
            Swal.fire({ // Muestra alerta de éxito
              title: "<strong>Registro exitoso!!!</strong>",
              html:"<i>El producto <strong>" + nombre + "</strong> fue registrado con exito</i>",
              icon: "success",
              timer: 3000,
            });
            console.log(response.data);
    }).catch((error)=>{           
            alert(error.message);
            console.log(error.message);
    }).finally(() => setLoading(false)); // usamos .finally() ya que este ejecuta código sin importar si la promesa fue exitosa o falló, quitamos el loading cuando ya cargo la respuesta del servidor
}

//limpiar campos
const limpiarCampos = ()=>{
  setNombre("");
  setPrecio("");
  setCategoria("");
  setCantidad("");
  setDescripcion("");
  setId("");
  setBotonEditar(false);
}

//get
const getProductos = ()=>{

  Axios.get("http://localhost:3002/productos/getAll")
  .then((response)=>{
      setProductos(response.data);
  }).catch((error)=>{
    
    Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro mostrar los empleados!",
              footer: error.message             
            });
           
  })
}

//put con el .then y .catch
// const putProductos = ()=>{

//   if(!nombre.trim() ||isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad < 0 || !categoria.trim() || !descripcion.trim()){ //usamos el trim() para quitar los espacios al inicio y al final de un string, ya que si el cliente unicamente le da espacio a la hora de escribir en el intput, si contaria como si tuviera un valor
//             alert("Por favor ingrese todos los campos")                                                                                //y isNaN suelta true si lo que esta dentro no es considerado un numero como abc o undefined
//             return; //termina con la ejecucion del programa
//     }

//   Axios.put("http://localhost:3002/update", {
//     nombre : nombre.trim(), //usamos el .trim() ya que lo mejor es enviar el string sin espacios ni al inicio ni al final
//     precio : Number(precio),
//     categoria : categoria.trim(),
//     cantidad : Number(cantidad),
//     descripcion : descripcion.trim(),  
//     id: id
//   }).then((response)=>{
//     alert(response.data)
//     getProductos();         
//     limpiarCampos();        
//     setBotonEditar(false);  
//   }).catch((error)=>{
//     alert(error.message)
//   })
// }

//put con el await y async
const putProductos = async () => {
  if(!nombre.trim() ||isNaN(precio) || precio <= 0 || precio > 99999999.99 || isNaN(cantidad) || cantidad < 0 || !categoria.trim() || !descripcion.trim()){ //usamos el trim() para quitar los espacios al inicio y al final de un string, ya que si el cliente unicamente le da espacio a la hora de escribir en el intput, si contaria como si tuviera un valor
            alert("Por favor ingrese todos los campos")                                                                                //y isNaN suelta true si lo que esta dentro no es considerado un numero como abc o undefined
            return; //termina con la ejecucion del programa
    }
  try {

      await Axios.put("http://localhost:3002/productos/update", { //como no usamos el response entonces no hace falta poner el "const response = Await..."
      nombre: nombre.trim(),            // eliminar espacios extras
      precio: Number(precio),           // asegurar que sea número
      categoria: categoria.trim(),
      cantidad: Number(cantidad),
      descripcion: descripcion.trim(),
      id: id
    });

     Swal.fire({
          title: "<strong>Actualización exitosa!!!</strong>",
          html: "<i>El producto <strong>" +nombre + "</strong> fue actualizado con exito</i>",
          icon: "success",
          timer: 3000,
        });
    
    getProductos();          // recarga la lista
    limpiarCampos();         // limpia los campos
    setBotonEditar(false);   // cambia estado de edición

  } catch (error) {
    
    Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro mostrar los productos!",
              footer: error.message             
            });
  }
};

//detele
const deleteProducto = (elemento)=>{

    setId(""); //para quitar el fondo verde de los td por si la persona le da al boton "editar" y luego le da a el boton "eliminar"
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
        Axios.delete(`http://localhost:3002/productos/delete/${elemento.id}`) //en este caso enviamos el id en los parametros del url y no como un JSON
          .then(() => {
            getProductos();
            limpiarCampos(); //para evitar intentar actualizar un empleado que ya fue eliminado.
            
            Swal.fire({
              html: "<strong>" + elemento.nombre + "</strong> fue eliminado",
              icon: "success",
              timer: 3000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el producto!",
              footer: error.message               
            });
          });
      }

    })    
    }

  // ============================================== JSX ===================================================== 
    return (

      <div className='container__productos'>

      
          <Link to="/" >  
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


    