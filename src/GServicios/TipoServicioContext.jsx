import React, { createContext, useState } from "react";

// Creación del contexto
export const TipoServicioContext = createContext();

// Componente proveedor que administra el estado global de los tipos de servicio
const TipoServicioProvider = ({ children }) => {
  // Estado local que contiene todos los tipos de servicios
  const [tiposServicios, setTiposServicios] = useState([]);

  // El valor que se pasa a los componentes hijos es un objeto que contiene el estado y el setter
  return (
    <TipoServicioContext.Provider value={{ tiposServicios, setTiposServicios }}>
      {children}
    </TipoServicioContext.Provider>
  );
};

export default TipoServicioProvider;
