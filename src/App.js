import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeFeed, Login, Register } from './pages'; // Make sure your Register component is properly imported

function App() {

  const navigate = (path) => {
    window.location.href = path; // or use history.push() if you're using a useHistory hook
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeFeed navigate={navigate} />} />
        <Route path="/login" element={<Login navigate={navigate} />} />
        <Route path="/register" element={<Register navigate={navigate} />} />
        {/* Other routes can be defined here */}
      </Routes>
    </Router>
  );
}

export default App;