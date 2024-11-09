import React, { useContext, useEffect, useState } from "react";
import { IMAGEN_EDIT, IMAGEN_DELETE, ITEMS_PER_PAGE } from "../App.config";
import { Link } from "react-router-dom";

import {
  obtenerArticulosVenta,
  eliminarArticulosVenta,
} from "../Services/ArticuloVentaService";
import { ArticuloVentaContext } from "./ArticuloVentaContext";

export default function ListadoArticulosVenta() {
  const { articulos, setArticulos } = useContext(ArticuloVentaContext);

  const [consulta, setConsulta] = useState("");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    fetchData();
  }, [page, pageSize, consulta]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    console.log("carga " + page);
    obtenerArticulosVenta(consulta, page, pageSize)
      .then((response) => {
        setArticulos(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const eliminacionExitosa = await eliminarArticulosVenta(id);
      if (eliminacionExitosa) {
        fetchData();
      } else {
        console.error("Error al eliminar el articulo");
      }
    } catch (error) {
      console.error("Error al eliminar el articulo:", error);
    }
  };

  // Ordenación de la tabla
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...articulos];
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

  // Cálculo del total del servicio
  const totalService = articulos.reduce((acc, articulo) => acc + articulo.precio, 0);

  return (
    <div className="container">
      <div>
        <h1> Gestión de Articulos Venta </h1>
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
            onChange={handleConsultaChange}
          />
        </div>
        <div className="col-1">
          <button onClick={() => fetchData()} className="btn btn-outline-success" type="submit">
            Buscar
          </button>
        </div>
      </div>
      <hr />
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
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
          {sortedData().map((articulo, indice) => (
            <tr key={indice}>
              <th scope="row">{articulo.id}</th>
              <td>{articulo.denominacion}</td>

              <td className="text-center">
                <div>
                  <Link to={`/articulo/${articulo.id}`} className="btn btn-link btn-sm me-3">
                    <img
                      src={IMAGEN_EDIT}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(articulo.id)}
                    className="btn btn-link btn-sm me-3"
                  >
                    <img
                      src={IMAGEN_DELETE}
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
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
          <Link to={`/articulo`} className="btn btn-success btn-sm me-3">
            Nuevo
          </Link>
        </div>
        <div className="col-4">
          <Link to={`/`} className="btn btn-info btn-sm me-3">
            Regresar
          </Link>
        </div>
      </div>

      <div className="pagination d-md-flex justify-content-md-end">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <a
            key={pageNumber}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(pageNumber);
            }}
          >
            | {pageNumber} |
          </a>
        ))}
      </div>

      {/* Total del servicio */}
      <div className="mt-3">
        <h4>Total: ${totalService.toFixed(2)}</h4>
      </div>
    </div>
  );
}
