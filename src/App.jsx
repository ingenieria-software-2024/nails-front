import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ArticuloVenta from "./Articulos/ArticuloVenta";
import ArticuloVentaProvider from "./Articulos/ArticuloVentaContext";
import Linea from "./Articulos/Linea";
import LineaProvider from "./Articulos/LineaContext";
import ListadoArticulosVenta from "./Articulos/ListadoArticulosVenta";
import ListadoLinea from "./Articulos/ListadoLinea";
import Cliente from "./Configuracion/Cliente";
import ClienteProvider from "./Configuracion/ClienteContext";
import ListadoCliente from "./Configuracion/ListadoCliente";
import ListadoServicio from "./GServicios/ListadoServicio";
import ListadoTipoServicio from "./GServicios/ListadoTipoServicio";
import Servicio from "./GServicios/Servicio";
import ServicioProvider from "./GServicios/ServicioContext";
import TipoServicio from "./GServicios/TipoServicio";
import TipoServicioProvider from "./GServicios/TipoServicioContext";
import Menu from "./Menu";

function App() {
  return (
    <div className="conteiner">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route
            exact
            path="/clienteList"
            element={
              <ClienteProvider>
                <ListadoCliente />
              </ClienteProvider>
            }
          />

          <Route
            exact
            path="/cliente"
            element={
              <ClienteProvider>
                <Cliente title="Nuevo" />
              </ClienteProvider>
            }
          />
          <Route
            exact
            path="/cliente/:id"
            element={
              <ClienteProvider>
                <Cliente title="Editar" />
              </ClienteProvider>
            }
          />

          <Route
            exact
            path="/lineaList"
            element={
              <LineaProvider>
                <ListadoLinea />
              </LineaProvider>
            }
          />
          <Route
            exact
            path="/linea"
            element={
              <LineaProvider>
                <Linea title="Nuevo" />
              </LineaProvider>
            }
          />
          <Route
            exact
            path="/linea/:id"
            element={
              <LineaProvider>
                <Linea title="Editar" />
              </LineaProvider>
            }
          />

          <Route
            exact
            path="/articuloList"
            element={
              <ArticuloVentaProvider>
                <ListadoArticulosVenta />
              </ArticuloVentaProvider>
            }
          />

          <Route
            exact
            path="/articulo"
            element={
              <ArticuloVentaProvider>
                <ArticuloVenta title="Nuevo" />
              </ArticuloVentaProvider>
            }
          />
          <Route
            exact
            path="/articulo/:id"
            element={
              <ArticuloVentaProvider>
                <ArticuloVenta title="Editar" />
              </ArticuloVentaProvider>
            }
          />

          <Route
            exact
            path="/tipoServicioList"
            element={
              <TipoServicioProvider>
                <ListadoTipoServicio />
              </TipoServicioProvider>
            }
          />
          <Route
            exact
            path="/tipoServicio"
            element={
              <TipoServicioProvider>
                <TipoServicio title="Nuevo" />
              </TipoServicioProvider>
            }
          />
          <Route
            exact
            path="/tipoServicio/:id"
            element={
              <TipoServicioProvider>
                <TipoServicio title="Editar" />
              </TipoServicioProvider>
            }
          />

          <Route
            exact
            path="/servicioList"
            element={
              <ServicioProvider>
                <ListadoServicio />
              </ServicioProvider>
            }
          />
          <Route
            exact
            path="/servicio"
            element={
              <ServicioProvider>
                <Servicio title="Nuevo" />
              </ServicioProvider>
            }
          />
          <Route
            exact
            path="/servicio/:id"
            element={
              <ServicioProvider>
                <Servicio title="Editar" />
              </ServicioProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
