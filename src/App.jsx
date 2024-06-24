import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapaPoligono from "./pages/MapaPoligono";
import Login from "./pages/Login.tsx";
import CrearCuenta from "./pages/CrearCuenta.tsx"
import CambioContraseña from "./pages/CambioContraseña.tsx";
import Modelo3d from "./pages/VistaModelo3D.tsx"
import PrivateRoute from "./components/login/PrivateRoute.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import AdminDashboard from "./pages/dashboard/AdminDashboard.tsx";
import Tutoriales from "./pages/Tutoriales.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Blog from "./pages/blog.tsx"
import Foro from "./pages/foro.tsx"
import PostDetails from "./components/Blog/postDetails.tsx"
import ColorChanger from "./components/accesibilidad/colorChanger.jsx";
import EosTest from "./pages/EosTest";
import OpenTopography from "./components/openTopography/OpenTopography"
import Proyectos from "./pages/projects.tsx"
import AnalisisModelo from "./pages/AnalisisModelo"

function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/CrearCuenta" element={<CrearCuenta />} />
      <Route path="/CambiarContraseña" element={<CambioContraseña />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/Tutoriales" element={<Tutoriales />} />
      <Route path="/PostDetails" element={<PostDetails />} />
      <Route path="/AdminDash" element={<AdminDashboard />} />
      <Route path="/foro" element={<Foro />} />
      <Route path="/EosTest" element={<EosTest />} />
      <Route path="/OpenTopography" element={<OpenTopography />} />
      <Route path="/proyectos" element={<Proyectos />} />
     
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
        children={ <Route path="/analisis" element={<AnalisisModelo />}/>}
        
      />
    </Routes>
  
    
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
