import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/Admin/Dashboard';
import DriverDashboard from './Pages/Driver/Dashboard';
import AuthMiddleware from './middleware/AuthMiddleware.jsx';
import Applications from './Pages/Admin/Application';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AuthMiddleware><AdminDashboard /></AuthMiddleware>}  />
        <Route path="/admin/applications" element={<AuthMiddleware><Applications /></AuthMiddleware>} />
        <Route path="/driver/dashboard" element={<AuthMiddleware><DriverDashboard /></AuthMiddleware>} />
      </Routes>
    </Router>
  );
}

export default App;
