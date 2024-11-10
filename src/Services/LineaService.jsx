import axios from "axios";
import { API_URL } from "../App.config";

export async function obtenerLineas(consulta, page, pageSize) {
  const urlBase = API_URL + "/lineasPageQuery";
  try {
    const { data } = await axios({
      method: "GET",
      url: urlBase,
      params: {
        consulta,
        page,
        size: pageSize,
      },
    });
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw error;
  }
}

export async function obtenerLineas2() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/lineas`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando lineas:", error);
    throw error;
  }
}

export async function obtenerLinea(id) {
  try {
    // `${urlBase}/${id}`
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/lineas/${id}`,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en buscar una linea:", error);
    throw error;
  }
}

export async function newLinea(linea) {
  if (linea.id > 0) {
    await axios({
      method: "PUT",
      url: `${API_URL}/lineas/${linea.id}`,
      data: linea,
    });
  } else {
    await axios({
      method: "POST",
      url: `${API_URL}/lineas`,
      data: linea,
    });
  }
}

export async function eliminarLineas(id) {
  const urlBase = API_URL + "/lineas";

  await axios({
    method: "DELETE",
    url: `${urlBase}/${id}`,
  });

  return true;
}
