import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/pages/mapaPoligono'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
