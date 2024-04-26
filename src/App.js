import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login, Register } from './pages'; // Make sure your Register component is properly imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Other routes can be defined here */}
      </Routes>
    </Router>
  );
}

export default App;