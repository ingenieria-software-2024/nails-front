import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"; // Importación adicional de App.css

import Menu from "./Menu";
import Providers from "./Providers";

import ListadoCliente from "./Configuracion/ListadoCliente";
import Cliente from "./Configuracion/Cliente";
import ClienteProvider from "./Configuracion/ClienteContext";

import ListadoLinea from "./Articulos/ListadoLinea";
import Linea from "./Articulos/Linea";
import LineaProvider from "./Articulos/LineaContext";

import ListadoArticulosVenta from "./Articulos/ListadoArticulosVenta";
import ArticuloVenta from "./Articulos/ArticuloVenta";
import ArticuloVentaProvider from "./Articulos/ArticuloVentaContext";

import ListadoTipoServicio from "./GServicios/ListadoTipoServicio";
import TipoServicio from "./GServicios/TipoServicio";
import TipoServicioProvider from "./GServicios/TipoServicioContext";

import ListadoServicio from "./GServicios/ListadoServicio";
import Servicio from "./GServicios/Servicio";
import ServicioProvider from "./GServicios/ServicioContext";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Menu />
        <Providers>
          {/* Providers específicos de cada sección */}
          <ClienteProvider>
            <LineaProvider>
              <ArticuloVentaProvider>
                <TipoServicioProvider>
                  <ServicioProvider>
                    <Routes>
                      {/* Rutas de clientes */}
                      <Route path="/clienteList" element={<ListadoCliente />} />
                      <Route path="/cliente" element={<Cliente title="Nuevo" />} />
                      <Route path="/cliente/:id" element={<Cliente title="Editar" />} />

                      {/* Rutas de líneas */}
                      <Route path="/lineaList" element={<ListadoLinea />} />
                      <Route path="/linea" element={<Linea title="Nuevo" />} />
                      <Route path="/linea/:id" element={<Linea title="Editar" />} />

                      {/* Rutas de artículos de venta */}
                      <Route path="/articuloList" element={<ListadoArticulosVenta />} />
                      <Route path="/articulo" element={<ArticuloVenta title="Nuevo" />} />
                      <Route path="/articulo/:id" element={<ArticuloVenta title="Editar" />} />

                      {/* Rutas de tipos de servicios */}
                      <Route path="/tipoServicioList" element={<ListadoTipoServicio />} />
                      <Route path="/tipoServicio" element={<TipoServicio title="Nuevo" />} />
                      <Route path="/tipoServicio/:id" element={<TipoServicio title="Editar" />} />

                      {/* Rutas de servicios */}
                      <Route path="/servicioList" element={<ListadoServicio />} />
                      <Route path="/servicio" element={<Servicio title="Nuevo" />} />
                      <Route path="/servicio/:id" element={<Servicio title="Editar" />} />
                    </Routes>
                  </ServicioProvider>
                </TipoServicioProvider>
              </ArticuloVentaProvider>
            </LineaProvider>
          </ClienteProvider>
        </Providers>
      </BrowserRouter>
    </div>
  );
}

export default App;
