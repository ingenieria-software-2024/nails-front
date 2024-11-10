import axios from "axios";
import { API_URL } from "../App.config.js";

export async function obtenerClientes(consulta, page, pageSize) {
  const urlBase = API_URL + "/clientesPageQuery";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}?consulta=${consulta}&page=${page}&size=${pageSize}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerClientesForCombo() {
  const urlBase = API_URL + "/clientes";
  try {
    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerCliente(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/clientes/${id}`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw error;
  }
}

export async function newCliente(cliente) {
  if (cliente.id > 0) {
    await axios({
      method: "PUT",
      url: `${API_URL}/clientes/${cliente.id}`,
      data: cliente,
    });
  } else {
    await axios({
      method: "POST",
      url: `${API_URL}/clientes`,
      data: cliente,
    });
  }
}

export async function eliminarCliente(id) {
  const urlBase = API_URL + "/clientes";

  await axios({
    method: "DELETE",
    url: `${urlBase}/${id}`,
  });

  return true;
}
