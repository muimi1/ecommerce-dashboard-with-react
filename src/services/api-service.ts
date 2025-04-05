
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: '/api', // Adjust this to match your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access - perhaps redirect to login
      console.error('Unauthorized access. Please log in again.');
      // You could dispatch a logout action or redirect here
    }
    return Promise.reject(error);
  }
);

export default api;
