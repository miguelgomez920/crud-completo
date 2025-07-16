import React from 'react';
import "./TablaProductos.css"

const TablaProductos = ({headers, productosArray, editarProducto, idEditando, deleteProducto})=>{

            return (
                         
                <table border="1">
              <thead>
                <tr>
                     {
                     headers.map((header, index)=> (
                          <th key={index}>{header}</th>
                      ))
                      }    
               
                </tr> 
              </thead>
              <tbody>
                {productosArray.map((elemento, index) => {
              return(
                    <tr className={elemento.id === idEditando ? "delinear" : ""} key={elemento.id}>
                      <td>{elemento.id}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.precio}</td>
                      <td>{elemento.categoria}</td>
                      <td>{elemento.cantidad}</td>
                      <td className='descripcion'>{elemento.descripcion}</td>
                      <td className="acciones">
                      <button className='editar' onClick={()=>{editarProducto(elemento)}}>Editar</button>
                      <button className='eliminar' onClick={()=>{deleteProducto(elemento)}}>Eliminar</button>
                      </td>
                    </tr>
                )    
                })}                                                                                                              
              </tbody>
        </table>

                       
            );

};


export default TablaProductos;