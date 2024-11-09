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
  const url = `${API_URL}/cliente/${id}`;
  return fetchData("GET", url);
};

// Crear o actualizar un cliente
export const newCliente = async (cliente) => {
  const url = cliente.id > 0 ? `${API_URL}/cliente/${cliente.id}` : `${API_URL}/cliente`;
  const method = cliente.id > 0 ? "PUT" : "POST";
  const response = await fetchData(method, url, cliente);
  return response;  // Retorna la respuesta para su manejo en la interfaz
};

// Eliminar un cliente
export const eliminarCliente = (id) => {
  const url = `${API_URL}/clienteEliminar/${id}`;
  return fetchData("PUT", url);
};
