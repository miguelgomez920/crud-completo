import React from "react";
import "./InputFormulario.css"


const InputFormulario = ({id, label, type, value, onChange, placeholder})=>{ //como value yo pondria state y como onChange yo pondria setState pero lo normal es usar value y onChange en esos casos

    return(
        <>
        <label htmlFor={id}>{label}<input type = {type}  //es buena practica asociar el label con el input con el htmlFor y el id del input
          id = {id}
          value={value}
          onChange={(event)=>{onChange(event.target.value)}}              //no hace falta poner el setNombre dentro de llaves ya que ya lo esta 
          placeholder={placeholder}></input></label>
        </>
    )
}


export default InputFormulario;