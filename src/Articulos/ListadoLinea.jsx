import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGEN_EDIT, IMAGEN_DELETE, ITEMS_PER_PAGE } from "../App.config";
import { LineaContext } from "./LineaContext";
import { obtenerLineas, eliminarLineas } from "../Services/LineaService";

export default function ListadoLinea() {
  const { lineas, setLineas } = useContext(LineaContext);

  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [error, setError] = useState(""); // Estado para manejar errores

  useEffect(() => {
    getDatos();
  }, [page, pageSize, consulta]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getDatos = async () => {
    try {
      console.log("Cargando datos de la página " + page);
      const response = await obtenerLineas(consulta, page, pageSize);
      setLineas(response.content);
      setTotalPages(response.totalPages);
      setError(""); // Limpiar errores al cargar correctamente
    } catch (error) {
      setError("Error al cargar las líneas, por favor intente más tarde.");
      console.error("Error fetching items:", error);
    }
  };

  const handConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    try {
      const eliminacionExitosa = await eliminarLineas(id);
      if (eliminacionExitosa) {
        getDatos();
      } else {
        setError("Error al eliminar la línea.");
      }
    } catch (error) {
      setError("Error al eliminar la línea.");
      console.error("Error al eliminar la línea:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...lineas];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de Líneas</h1>
        <hr />
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control me-2"
            type="search"
            aria-label="Search"
            value={consulta}
            onChange={handConsultaChange}
            placeholder="Buscar por denominación"
          />
        </div>
        <div className="col-1">
          <button
            onClick={() => getDatos()}
            className="btn btn-outline-success"
            type="submit"
            aria-label="Buscar"
          >
            Buscar
          </button>
        </div>
      </div>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}

      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark text-center">
          <tr>
            <th scope="col" onClick={() => handleSort("id")}>
              #
              {sortConfig.key === "id" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("denominacion")}>
              Denominación
              {sortConfig.key === "denominacion" && (
                <span>{sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}</span>
              )}
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData().map((linea, indice) => (
            <tr key={indice}>
              <th scope="row">{linea.id}</th>
              <td>{linea.denominacion}</td>
              <td className="text-center">
                <div>
                  <Link to={`/linea/${linea.id}`} className="btn btn-link btn-sm me-3" aria-label="Editar línea">
                    <img
                      src={IMAGEN_EDIT}
                      style={{ width: "20px", height: "20px" }}
                      alt="Editar"
                    />
                    Editar
                  </Link>

                  <button
                    onClick={() => eliminar(linea.id)}
                    className="btn btn-link btn-sm me-3"
                    aria-label="Eliminar línea"
                  >
                    <img
                      src={IMAGEN_DELETE}
                      style={{ width: "20px", height: "20px" }}
                      alt="Eliminar"
                    />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-4">
          <Link to={`/linea`} className="btn btn-success btn-sm me-3" aria-label="Crear nueva línea">
            Nuevo
          </Link>
        </div>
        <div className="col-4">
          <Link to={`/`} className="btn btn-info btn-sm me-3" aria-label="Regresar al inicio">
            Regresar
          </Link>
        </div>
      </div>

      {/* Paginación */}
      <div className="pagination d-md-flex justify-content-md-end">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <a
            key={pageNumber}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pageNumber);
            }}
            aria-label={`Ir a la página ${pageNumber + 1}`}
          >
            | {pageNumber + 1} |
          </a>
        ))}
      </div>
    </div>
  );
}
