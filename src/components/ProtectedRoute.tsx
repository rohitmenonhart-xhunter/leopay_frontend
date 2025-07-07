import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading, user, hasDashboardAccess, token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute state:', { 
      isAuthenticated, 
      loading, 
      userExists: !!user, 
      userRole: user?.role,
      path: location.pathname,
      hasToken: !!token
    });
  }, [isAuthenticated, loading, user, location.pathname, token]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f8f0]">
        <div className="w-12 h-12 border-4 border-[#0a5c36] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If trying to access admin routes but not an admin, redirect to dashboard
  if (location.pathname.startsWith('/admin') && (!user || user.role !== 'admin')) {
    return <Navigate to="/dashboard" replace />;
  }

  // If trying to access dashboard but doesn't have access yet, redirect to pre-dashboard
  if (location.pathname === '/dashboard' && user && !user.dashboardAccess) {
    return <Navigate to="/pre-dashboard" replace />;
  }

  // If trying to access pre-dashboard but already has dashboard access, redirect to dashboard
  if (location.pathname === '/pre-dashboard' && user && user.dashboardAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute; 