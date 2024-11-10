import React, { createContext, useState, useContext } from "react";

// Creación del contexto
export const LineaContext = createContext(null);

// Hook personalizado para facilitar el uso del contexto
export const useLineaContext = () => {
  const context = useContext(LineaContext);
  if (!context) {
    throw new Error("useLineaContext debe usarse dentro de LineaProvider");
  }
  return context;
};

const LineaProvider = ({ children }) => {
  const [lineas, setLineas] = useState([]);

  return (
    <LineaContext.Provider value={{ lineas, setLineas }}>
      {children}
    </LineaContext.Provider>
  );
};

export default LineaProvider;
