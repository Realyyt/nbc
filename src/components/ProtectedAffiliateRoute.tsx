import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedAffiliateRouteProps {
  children: React.ReactNode;
}

const ProtectedAffiliateRoute: React.FC<ProtectedAffiliateRouteProps> = ({ children }) => {
  const affiliateToken = localStorage.getItem('affiliateToken');
  const affiliateUser = localStorage.getItem('affiliateUser');

  console.log('ProtectedAffiliateRoute - affiliateToken:', affiliateToken ? 'exists' : 'missing');
  console.log('ProtectedAffiliateRoute - affiliateUser:', affiliateUser ? 'exists' : 'missing');

  if (!affiliateToken || !affiliateUser) {
    console.log('ProtectedAffiliateRoute - redirecting to login: missing token or user');
    // Redirect to affiliate login if not authenticated
    return <Navigate to="/affiliate/login" replace />;
  }

  try {
    const user = JSON.parse(affiliateUser);
    console.log('ProtectedAffiliateRoute - user role:', user.role);
    if (user.role !== 'affiliate') {
      console.log('ProtectedAffiliateRoute - redirecting to login: not affiliate role');
      // Redirect to affiliate login if not an affiliate
      return <Navigate to="/affiliate/login" replace />;
    }
  } catch (error) {
    console.log('ProtectedAffiliateRoute - redirecting to login: invalid user data');
    // Invalid user data, redirect to login
    return <Navigate to="/affiliate/login" replace />;
  }

  console.log('ProtectedAffiliateRoute - rendering children');
  return <>{children}</>;
};

export default ProtectedAffiliateRoute;
