import axios from "axios";
import { API_URL } from "../App.config";

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

// Obtener artículos de venta con paginación y búsqueda
export const obtenerArticulosVenta = (consulta, page, pageSize) => {
  const url = `${API_URL}/articulosPageQuery?consulta=${consulta}&page=${page}&size=${pageSize}`;
  return fetchData("GET", url);
};

// Obtener un artículo de venta por su ID
export const obtenerArticuloVenta = (id) => {
  const url = `${API_URL}/articulos/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar un artículo de venta
export const newArticuloVenta = async (model) => {
  const url = model.id > 0 ? `${API_URL}/articulos/${model.id}` : `${API_URL}/articulos`;
  const method = model.id > 0 ? "PUT" : "POST";
  return await fetchData(method, url, model);  // Retorna la respuesta para su manejo en la interfaz
};

// Eliminar un artículo de venta
export const eliminarArticulosVenta = async (id) => {
  const url = `${API_URL}/articulosEliminar/${id}`;
  return await fetchData("PUT", url);
};
