import axios from "axios";
import { API_URL } from "../App.config.js";

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

// Obtener clientes con paginación y búsqueda
export const obtenerClientes = (consulta, page, pageSize) => {
  const url = `${API_URL}/clientesPageQuery?consulta=${consulta}&page=${page}&size=${pageSize}`;
  return fetchData("GET", url);
};

// Obtener clientes para combo
export const obtenerClientesForCombo = () => {
  const url = `${API_URL}/clientes`;
  return fetchData("GET", url);
};

// Obtener un cliente por ID
export const obtenerCliente = (id) => {
  const url = `${API_URL}/clientes/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar un cliente
export const newCliente = async (cliente) => {
  const url = cliente.id > 0 ? `${API_URL}/clientes/${cliente.id}` : `${API_URL}/clientes`;
  const method = cliente.id > 0 ? "PUT" : "POST";
  return await fetchData(method, url, cliente);
};

// Eliminar un cliente
export const eliminarCliente = async (id) => {
  const url = `${API_URL}/clientes/${id}`;
  return await fetchData("DELETE", url);
};
