import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerCliente } from "../Services/ClienteService";

export default function Cliente({ title }) {
  const urlBase = "http://localhost:8080/nails/clientes";
  const navegacion = useNavigate();

  const { id } = useParams();
  const [cliente, setCliente] = useState({
    razonSocial: "",
    celular: "",
    mail: "",
  });
  const [error, setError] = useState(""); // Estado para errores
  const { razonSocial, celular, mail } = cliente;

  useEffect(() => {
    if (id > 0) {
      cargarCliente();
    }
  }, [id]);

  const cargarCliente = async () => {
    try {
      const resultado = await obtenerCliente(id);
      setCliente(resultado);
    } catch (error) {
      setError("Error al cargar los datos del cliente.");
      console.error("Error al cargar cliente:", error);
    }
  };

  const onInputChange = ({ target: { name, value } }) => {
    setCliente({ ...cliente, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id > 0) {
        await axios.put(`${urlBase}/${id}`, cliente);
      } else {
        await axios.post(urlBase, cliente);
      }
      navegacion("/clienteList");
    } catch (error) {
      setError("Error al guardar los datos del cliente.");
      console.error("Error al guardar cliente:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes / {title} </h1>
        <hr />
      </div>

      {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error si existe */}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            Apellido Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            required
            value={razonSocial}
            onChange={onInputChange}
            aria-label="Nombre y apellido del cliente"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="celular" className="form-label">
            Celular
          </label>
          <input
            type="number"
            className="form-control"
            id="celular"
            name="celular"
            required
            value={celular}
            onChange={onInputChange}
            aria-label="Número de celular del cliente"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Mail
          </label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            value={mail}
            onChange={onInputChange}
            aria-label="Correo electrónico del cliente"
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/clienteList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
