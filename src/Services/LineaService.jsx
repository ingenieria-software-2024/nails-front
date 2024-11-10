import axios from "axios";
import { API_URL } from "../App.config";

// Función genérica para manejar solicitudes HTTP
const fetchData = async (method, url, data = null) => {
  try {
    const config = { method, url };
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

// Obtener líneas con paginación y búsqueda
export const obtenerLineas = (consulta, page, pageSize) => {
  const url = `${API_URL}/lineasPageQuery?consulta=${consulta}&page=${page}&size=${pageSize}`;
  return fetchData("GET", url);
};

// Obtener todas las líneas para combo
export const obtenerLineas2 = () => {
  const url = `${API_URL}/lineas`;
  return fetchData("GET", url);
};

// Obtener una línea por ID
export const obtenerLinea = (id) => {
  const url = `${API_URL}/lineas/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar una línea
export const newLinea = async (linea) => {
  const url = linea.id > 0 ? `${API_URL}/lineas/${linea.id}` : `${API_URL}/lineas`;
  const method = linea.id > 0 ? "PUT" : "POST";
  return await fetchData(method, url, linea);
};

// Eliminar una línea
export const eliminarLineas = async (id) => {
  const url = `${API_URL}/lineas/${id}`;
  return await fetchData("DELETE", url);
};
