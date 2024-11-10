import axios from "axios";
import { API_URL } from "../App.config";

export async function obtenerTiposServicios(consulta, page, pageSize) {
  try {
    const urlBase = API_URL + "/tiposerviciosPageQuery";
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
    console.error("Error buscando tipos de servicios:", error);
    throw error;
  }
}

export async function obtenerTiposServiciosForCombo() {
  try {
    const urlBase = API_URL + "/tiposervicios";

    const { data } = await axios({
      method: "GET",
      url: `${urlBase}`,
    });

    return data;
  } catch (error) {
    console.error("Error buscando tipos de servicios:", error);
    throw error;
  }
}

export async function obtenerTipoServicio(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${API_URL}/tiposervicios/${id}`,
    });

    return data;
  } catch (error) {
    console.error("Error en buscar un tipo servicio", error);
    throw error;
  }
}

export async function newTipoServicio(tipoServicio) {
  if (tipoServicio.id > 0) {
    await axios({
      method: "PUT",
      url: `${API_URL}/tiposervicios/${tipoServicio.id}`,
      data: tipoServicio,
    });
  } else {
    await axios({
      method: "POST",
      url: `${API_URL}/tiposervicios`,
      data: tipoServicio,
    });
  }
}

export async function eliminarTipoServicio(id) {
  const urlBase = API_URL + "/tipoServicioEliminar";

  await axios({
    method: "DELETE",
    url: `${urlBase}/${id}`,
  });

  return true;
}
