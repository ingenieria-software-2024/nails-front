import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  newArticuloVenta,
  obtenerArticuloVenta,
} from "../Services/ArticuloVentaService";
import { obtenerLineas2 } from "../Services/LineaService";

export default function ArticuloVentaForm({ title }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [articulo, setArticulo] = useState({
    denominacion: "",
    linea: 0,
    total: 0,
  });

  const [listaLineas, setListaLineas] = useState([]);
  const [lineaSeleccionada, setLineaSeleccionada] = useState("");
  const { denominacion, linea, total } = articulo;

  useEffect(() => {
    cargarArticulo();
    cargarLineas();
  }, []);

  const cargarArticulo = async () => {
    if (id > 0) {
      const resultado = await obtenerArticuloVenta(id);
      setArticulo(resultado);
      setLineaSeleccionada(resultado.linea);
    }
  };

  const cargarLineas = async () => {
    const resultado = await obtenerLineas2();
    setListaLineas(resultado);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setArticulo({ ...articulo, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...articulo,
      linea: lineaSeleccionada,
    };
    newArticuloVenta(data);
    navigate("/articuloList");
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de artículo / {title}</h1>
        <hr />
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="denominacion" className="form-label">Denominación</label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required
            value={denominacion}
            onChange={onInputChange}
          />

          <label htmlFor="listaLineas">Selecciona una línea:</label>
          <select
            id="listaLineas"
            value={lineaSeleccionada}
            required
            onChange={(e) => setLineaSeleccionada(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {listaLineas.map((linea) => (
              <option key={linea.id} value={linea.id}>
                {linea.denominacion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="total" className="form-label">Total del Servicio</label>
          <input
            type="text"
            className="form-control"
            id="total"
            name="total"
            required
            value={`$${total.toFixed(2)}`}
            disabled // Para hacer el campo de solo lectura
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/articuloList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>

      {/* Ejemplo de tabla para visualizar los artículos */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Denominación</th>
            <th>Línea</th>
          </tr>
        </thead>
        <tbody>
          {listaLineas.map((linea) => (
            <tr key={linea.id}>
              <td>{linea.id}</td>
              <td>{linea.denominacion}</td>
              <td>{linea.nombreLinea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
