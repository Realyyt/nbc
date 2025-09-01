import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  console.log('ProtectedAdminRoute - adminToken:', adminToken ? 'exists' : 'missing');
  console.log('ProtectedAdminRoute - adminUser:', adminUser ? 'exists' : 'missing');

  if (!adminToken || !adminUser) {
    console.log('ProtectedAdminRoute - redirecting to login: missing token or user');
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const user = JSON.parse(adminUser);
    console.log('ProtectedAdminRoute - user role:', user.role);
    if (user.role !== 'admin') {
      console.log('ProtectedAdminRoute - redirecting to login: not admin role');
      // Redirect to admin login if not an admin
      return <Navigate to="/admin/login" replace />;
    }
  } catch (error) {
    console.log('ProtectedAdminRoute - redirecting to login: invalid user data');
    // Invalid user data, redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  console.log('ProtectedAdminRoute - rendering children');
  return <>{children}</>;
};

export default ProtectedAdminRoute;
