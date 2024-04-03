import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/pages/mapaPoligono'; 
import Modelo3d from '../src/pages/vistaModelo3D.jsx'
import Login from '../src/pages/login.jsx'
import SolveComponent from './components/rhinoCompute/solve.jsx';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Login />} />
        <Route exact path="/Poligono" element={<Layout />} />
        <Route exact path="/GoogleEarth" element={<Modelo3d />} />
        <Route exact path="/solve" element={<SolveComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
