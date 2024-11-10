import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Creamos el contexto de clientes
export const ClienteContext = createContext();

// Proveedor del contexto de clientes
const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  // Función para cargar los clientes desde la API
  const cargarClientes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/nails/clientes");
      setClientes(response.data); // Actualiza el estado con los datos de clientes
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  };

  // Usamos useEffect para cargar los clientes cuando el componente se monte
  useEffect(() => {
    cargarClientes();
  }, []);

  // Proporcionamos el contexto con los valores necesarios
  return (
    <ClienteContext.Provider value={{ clientes, setClientes }}>
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;
