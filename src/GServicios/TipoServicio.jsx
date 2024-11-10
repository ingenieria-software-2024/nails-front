import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newTipoServicio, obtenerTipoServicio } from "../Services/TipoServicioService";

export default function TipoServicio({ title }) {
  const navegacion = useNavigate();
  const { id } = useParams();

  const [tipoServicio, setTipoServicio] = useState({
    denominacion: "",
  });
  const [loading, setLoading] = useState(false);  // Estado de carga para mostrar el proceso

  const { denominacion } = tipoServicio;

  // Cargar datos si estamos editando un tipo de servicio
  useEffect(() => {
    if (id) {
      cargarModelo();
    }
  }, [id]);

  const cargarModelo = async () => {
    setLoading(true);
    try {
      const resultado = await obtenerTipoServicio(id);
      setTipoServicio(resultado);
    } catch (error) {
      console.error("Error al cargar el tipo de servicio:", error);
      // Maneja el error aquí (mostrar un mensaje al usuario, por ejemplo)
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setTipoServicio({ ...tipoServicio, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Actualizar el tipo de servicio
        // Aquí podrías crear una función para editar el servicio
      } else {
        // Crear nuevo tipo de servicio
        await newTipoServicio(tipoServicio);
      }
      navegacion("/tipoServicioList");
    } catch (error) {
      console.error("Error al guardar el tipo de servicio:", error);
      // Manejar el error aquí (mostrar un mensaje al usuario, por ejemplo)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de tipo servicio / {title}</h1>
        <hr />
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="denominacion" className="form-label">
            Denominación
          </label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required
            value={denominacion}
            onChange={onInputChange}
            disabled={loading} // Deshabilitar el input durante la carga
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
          <div className="col-4">
            <a href="/tipoServicioList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
