import React from "react"
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // If still loading auth state, show nothing or a loader
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If admin route but user is not admin, redirect to dashboard
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // If authenticated and proper role, render children
  return <>{children}</>;
};

export default ProtectedRoute;