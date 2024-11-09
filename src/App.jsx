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
            <Route exact path="/clienteList" element={<ListadoCliente />} />
            <Route exact path="/cliente" element={<Cliente title="Nuevo" />} />
            <Route exact path="/cliente/:id" element={<Cliente title="Editar" />} />

            <Route exact path="/lineaList" element={<ListadoLinea />} />
            <Route exact path="/linea" element={<Linea title="Nuevo" />} />
            <Route exact path="/linea/:id" element={<Linea title="Editar" />} />

            <Route exact path="/articuloList" element={<ListadoArticulosVenta />} />
            <Route exact path="/articulo" element={<ArticuloVenta title="Nuevo" />} />
            <Route exact path="/articulo/:id" element={<ArticuloVenta title="Editar" />} />

            <Route exact path="/tipoServicioList" element={<ListadoTipoServicio />} />
            <Route exact path="/tipoServicio" element={<TipoServicio title="Nuevo" />} />
            <Route exact path="/tipoServicio/:id" element={<TipoServicio title="Editar" />} />

            <Route exact path="/servicioList" element={<ListadoServicio />} />
            <Route exact path="/servicio" element={<Servicio title="Nuevo" />} />
            <Route exact path="/servicio/:id" element={<Servicio title="Editar" />} />
          </Routes>
        </Providers>
      </BrowserRouter>
    </div>
  );
}

export default App;
