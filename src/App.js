import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../src/Shared/Layout'; 

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
