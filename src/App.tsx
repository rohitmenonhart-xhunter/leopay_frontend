import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './components/LandingPage';
import PreDashboardAccess from './pages/PreDashboardAccess';
import AdminLeads from './pages/AdminLeads';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/pre-dashboard" element={<PreDashboardAccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;