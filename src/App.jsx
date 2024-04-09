import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/mapaPoligono.jsx";
import Login from "./pages/login.tsx";
import CrearCuenta from "./pages/CrearCuenta.tsx"
import Modelo3d from "./pages/vistaModelo3D.jsx"
import PrivateRoute from "./components/login/PrivateRoute.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";


function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/CrearCuenta" element={<CrearCuenta />} />
      <Route
        path="/"
        element={<PrivateRoute />}
        children={<Route path="/Poligono" element={<Layout />} />}
        
      />
      <Route
        path="/"
        element={<PrivateRoute />}
        children={<Route path="/GoogleEarth" element={<Modelo3d/>} />}
        
      />
    </Routes>
  </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
   
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;
