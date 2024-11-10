import { createContext, useState } from "react";

// Define un contexto con un valor predeterminado inicial.
export const ArticuloVentaContext = createContext({
  articulos: [],
  setArticulos: () => {}
});

const ArticuloVentaProvider = ({ children }) => {
  // Estado para almacenar los artículos de venta.
  const [articulos, setArticulos] = useState([]);

  return (
    <ArticuloVentaContext.Provider value={{ articulos, setArticulos }}>
      {children}
    </ArticuloVentaContext.Provider>
  );
};

export default ArticuloVentaProvider;
