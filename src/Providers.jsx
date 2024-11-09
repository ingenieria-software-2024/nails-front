import React from "react";
import ClienteProvider from "./Configuracion/ClienteContext";
import LineaProvider from "./Articulos/LineaContext";
import ArticuloVentaProvider from "./Articulos/ArticuloVentaContext";
import TipoServicioProvider from "./GServicios/TipoServicioContext";
import ServicioProvider from "./GServicios/ServicioContext";

const Providers = ({ children }) => {
  return (
    <ClienteProvider>
      <LineaProvider>
        <ArticuloVentaProvider>
          <TipoServicioProvider>
            <ServicioProvider>
              {children}
            </ServicioProvider>
          </TipoServicioProvider>
        </ArticuloVentaProvider>
      </LineaProvider>
    </ClienteProvider>
  );
};

export default Providers;
