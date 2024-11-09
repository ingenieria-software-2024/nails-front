import axios from "axios";
import { API_URL } from "../App.config";

// Función genérica para manejar solicitudes HTTP
const fetchData = async (method, url, data = null, params = null) => {
  try {
    const config = { method, url, params };
    if (data) {
      config.data = data;
    }
    const { data: responseData } = await axios(config);
    return responseData;
  } catch (error) {
    console.error(`Error en la solicitud ${method} a ${url}:`, error);
    throw new Error("Error al procesar la solicitud.");
  }
};

// Obtener una lista paginada de tipos de servicios
export const obtenerTiposServicios = (consulta, page, pageSize) => {
  const url = `${API_URL}/tiposServiciosPageQuery`;
  return fetchData("GET", url, null, { consulta, page, pageSize });
};

// Obtener todos los tipos de servicios para combo
export const obtenerTiposServiciosForCombo = () => {
  const url = `${API_URL}/tiposServicios`;
  return fetchData("GET", url);
};

// Obtener un tipo de servicio por su ID
export const obtenerTipoServicio = (id) => {
  const url = `${API_URL}/tiposServicios/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar un tipo de servicio
export const newTipoServicio = async (tipoServicio) => {
  const url = tipoServicio.id > 0 ? `${API_URL}/tipoServicios/${tipoServicio.id}` : `${API_URL}/tiposServicios`;
  const method = tipoServicio.id > 0 ? "PUT" : "POST";
  const response = await fetchData(method, url, tipoServicio);
  return response;  // Retorna la respuesta para su manejo en la interfaz
};

// Eliminar un tipo de servicio
export const eliminarTipoServicio = (id) => {
  const url = `${API_URL}/tipoServicioEliminar/${id}`;
  return fetchData("PUT", url);
};
