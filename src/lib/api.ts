import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Check for admin token first (for admin routes)
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken && config.url?.includes('/admin/')) {
      console.log('Adding admin token to request:', config.url);
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (config.url?.includes('/affiliates/') && !config.url?.includes('/admin/')) {
      // Check for affiliate token (for affiliate routes, not admin affiliate routes)
      const affiliateToken = localStorage.getItem('affiliateToken');
      if (affiliateToken) {
        console.log('Adding affiliate token to request:', config.url);
        config.headers.Authorization = `Bearer ${affiliateToken}`;
      }
    } else {
      // Check for regular user token
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Adding user token to request:', config.url);
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log('Request config:', config.url, config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          if (error.config.url?.includes('/admin/')) {
            // Admin authentication error
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
          } else if (error.config.url?.includes('/affiliates/') && !error.config.url?.includes('/admin/')) {
            // Affiliate authentication error
            localStorage.removeItem('affiliateToken');
            localStorage.removeItem('affiliateUser');
            window.location.href = '/affiliate/login';
          } else {
            // Regular user authentication error
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          // Handle forbidden access
          console.error('Access forbidden');
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('An error occurred:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 