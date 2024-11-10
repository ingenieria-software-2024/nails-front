import { createContext, useState } from "react";

// Creamos el contexto para los servicios
export const ServicioContext = createContext();

// El provider del contexto para envolver la aplicación
const ServicioProvider = ({ children }) => {
  // El estado de los servicios, inicializado como un arreglo vacío
  const [servicios, setServicios] = useState([]);

  // Aquí puedes agregar funciones adicionales si necesitas manejar
  // lógicas relacionadas con los servicios, por ejemplo:
  // - agregar un servicio
  // - eliminar un servicio
  // - actualizar un servicio
  // - limpiar la lista de servicios
  // Si lo necesitas, puedes hacerlo aquí.

  return (
    // Proveemos el contexto con el estado y las funciones
    <ServicioContext.Provider value={{ servicios, setServicios }}>
      {children}
    </ServicioContext.Provider>
  );
};

export default ServicioProvider;
