import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapaPoligono from "./components/maps/MapaPoligono.tsx";
import Login from "./pages/Login.tsx";
import CrearCuenta from "./pages/CrearCuenta.tsx"
import CambioContraseña from "./pages/CambioContraseña.tsx";
import PrivateRoute from "./components/login/PrivateRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Tutoriales from "./pages/Tutoriales.tsx";
import Blog from "./pages/blog.tsx"
import Foro from "./pages/foro.tsx"
import PostDetails from "./components/Blog/postDetails.tsx"
import EosTest from "./pages/EosTest";
import OpenTopography from "./components/openTopography/OpenTopography"
import Proyectos from "./pages/projects.tsx"
import AnalisisModelo from "./pages/AnalisisPage.tsx"
import SelectSuelos from "./components/suelos/selectSuelos.tsx"
import GestionAgua from "./pages/Herramientas/herramientasPagadas/gestionAgua.tsx"
import AnalisisGeografico from "./pages/Herramientas/herramientasNoPagadas/analisisGeografico.tsx"
import Layer from "./pages/layers.tsx"
import MainNavbar from "./components/mainNavbar/MainNavbar.tsx"
import MainFooter from "./components/footer/MainFooter.tsx"
import Herramientas from "./pages/HerramientasPage.tsx"
import { useAuth0 } from "@auth0/auth0-react"
import "./App.css";
import BuscadorJson from "./components/guardarProyectos/BuscadorJson.tsx";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <div className="app-container">
        <MainNavbar />
        <div className="content" style={{ marginTop: isAuthenticated ? '50px' : '0px' }}>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/CrearCuenta" element={<CrearCuenta />} />
            <Route path="/CambiarContraseña" element={<CambioContraseña />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Tutoriales" element={<Tutoriales />} />
            <Route path="/PostDetails" element={<PostDetails />} />
            <Route path="/foro" element={<Foro />} />
            <Route path="/layer" element={<Layer />} />
            <Route path="/EosTest" element={<EosTest />} />
            <Route path="/OpenTopography" element={<OpenTopography />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/select" element={<SelectSuelos />} />
            <Route path="/analisisGeogrfico" element={<AnalisisGeografico />} />
            <Route path="/gestionAgua" element={<GestionAgua />} />
            {/* <Route path="/spiky" element={<SpikyThing />} /> */}
            <Route path="/herramientas" element={<Herramientas />} />
            <Route path="/buscarJson" element={<BuscadorJson />}/>
            {/* <Route path="/solve" element={solve}/> */}

            <Route
              path="/"
              element={<PrivateRoute />}
              children={<Route path="/dashboard" element={<Dashboard />} />}

            />

            <Route
              path="/"
              element={<PrivateRoute />}
              children={<Route path="/poligono" element={<MapaPoligono />} />}

            />
            <Route
              path="/"
              element={<PrivateRoute />}
              children={<Route path="/analisis" element={<AnalisisModelo />} />}

            />
          </Routes>

        </div>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

// ReactDOM.render(
//   <React.StrictMode>
//       <App />

//   </React.StrictMode>,
//   document.getElementById("root")
// );

export default App;
