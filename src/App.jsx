import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import ListadoCliente from "./Configuracion/ListadoCliente";
import Cliente from "./Configuracion/Cliente";
import ListadoLinea from "./Articulos/ListadoLinea";
import Linea from "./Articulos/Linea";
import ListadoArticulosVenta from "./Articulos/ListadoArticulosVenta";
import ArticuloVenta from "./Articulos/ArticuloVenta";
import ListadoTipoServicio from "./GServicios/ListadoTipoServicio";
import TipoServicio from "./GServicios/TipoServicio";
import ListadoServicio from "./GServicios/ListadoServicio";
import Servicio from "./GServicios/Servicio";
import Providers from "./Providers";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Menu />
        <Providers>
          <Routes>
            {/* Rutas de clientes */}
            <Route path="/clienteList" element={<ListadoCliente />} />
            <Route path="/cliente" element={<Cliente title="Nuevo" />} />
            <Route path="/cliente/:id" element={<Cliente title="Editar" />} />

            {/* Rutas de lineas */}
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
        </Providers>
      </BrowserRouter>
    </div>
  );
}

export default App;
