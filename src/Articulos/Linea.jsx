import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { newLinea, obtenerLinea } from "../Services/LineaService";

export default function Linea({ title }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [linea, setLinea] = useState({
    denominacion: "",
  });

  const { denominacion } = linea;

  useEffect(() => {
    cargarModel();
  }, []);

  const cargarModel = async () => {
    if (id > 0) {
      try {
        const resultado = await obtenerLinea(id);
        setLinea(resultado);
      } catch (error) {
        console.error("Error al cargar la línea:", error);
      }
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLinea({ ...linea, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await newLinea(linea);
      navigate("/lineaList");
    } catch (error) {
      console.error("Error al guardar la línea:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de Línea / {title}</h1>
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
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <Link to="/lineaList" className="btn btn-info btn-sm me-3">
              Regresar
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
