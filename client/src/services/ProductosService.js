
//logica peticiones HTTP
import Axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL; // Base URL de la API, obtenida desde variables de entorno (.env)

//Obtener el token desde localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Funciones para hacer peticiones al backend
export const getAllProductos = () => Axios.get(`${BASE_URL}/productos`, getAuthHeaders());
export const createProducto = (producto) => Axios.post(`${BASE_URL}/productos`, producto, getAuthHeaders());
export const updateProducto = (id, producto) => Axios.put(`${BASE_URL}/productos/${id}`, producto, getAuthHeaders());
export const deleteProductoById = (id) => Axios.delete(`${BASE_URL}/productos/${id}`, getAuthHeaders());
