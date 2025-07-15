// import React from "react";
import "./BotonFormulario.css"

const BotonFormulario = ({botonEditar, putProductos, limpiarCampos, postProductos, loading })=>{

    return (

        <>
        {botonEditar ? (                           //ponemos todo dentro de llaves, ya que estamos usando el operador ternario y este es de js
            <div className='botonesEditar'>
              <button
              className="actualizar"
              onClick={()=>{putProductos()}}>Actualizar</button>
              <button 
              className="cancelar"
              onClick={()=>{limpiarCampos()}}>Cancelar</button>
            </div>
          ) : (
            <button onClick={postProductos} disabled={loading} >{loading ? "Registrando..." : "Registrar producto"}</button> //usamos disable para deshabilitar temporalmente el boton cuando loading es true ()
          )}
        </>

    )

}

export default BotonFormulario;