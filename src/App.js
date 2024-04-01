import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/pages/mapaPoligono'; 
import Modelo3d from '../src/pages/vistaModelo3D.jsx'
import Login from '../src/pages/login.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />} />
        <Route exact path="/GoogleEarth" element={<Modelo3d />} />
        <Route exact path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
