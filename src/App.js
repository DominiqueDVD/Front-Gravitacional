import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/pages/mapaPoligono'; 
import Modelo3d from '../src/pages/vistaModelo3D.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />} />
        <Route exact path="/GoogleEarth" element={<Modelo3d />} />
      </Routes>
    </Router>
  );
}

export default App;
