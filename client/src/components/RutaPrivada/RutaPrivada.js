import React from "react";
import { Navigate } from "react-router-dom";

//Este componente verifica si existe un token (guardado en el localStorage), y: Si hay token: permite mostrar el contenido protegido (children). Si no hay token: redirige al usuario al login (<Navigate to="/login" />).
const RutaPrivada = ({ children }) => { //recibe children como prop, es decir, lo que esta dentro de <RutaPrivada> </RutaPrivada>
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" />; //Si hay un token (es decir, el usuario está autenticado), muestra lo que esté dentro de children (normalmente una página privada). y Si no hay token, redirige a la ruta /login usando Navigate.
};

export default RutaPrivada;