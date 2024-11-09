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

// Obtener una lista paginada de servicios
export const obtenerServicios = (consulta, page, pageSize) => {
  const url = `${API_URL}/serviciosPageQuery`;
  return fetchData("GET", url, null, { consulta, page, pageSize });
};

// Obtener un servicio por su ID
export const obtenerServicio = (id) => {
  const url = `${API_URL}/servicio/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar un servicio
export const newServicio = async (servicio) => {
  const url = servicio.id > 0 ? `${API_URL}/servicios/${servicio.id}` : `${API_URL}/servicios`;
  const method = servicio.id > 0 ? "PUT" : "POST";
  const response = await fetchData(method, url, servicio);
  return response;  // Retorna la respuesta para su manejo en la interfaz
};

// Eliminar un servicio
export const eliminarServicio = (id) => {
  const url = `${API_URL}/servicioEliminar/${id}`;
  return fetchData("PUT", url);
};
