// API Configuration
// In production, you can set REACT_APP_API_URL as an environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  ADMIN: {
    CREATE_USER: `${API_BASE_URL}/api/admin/create-user`,
    GET_USERS: `${API_BASE_URL}/api/admin/users`,
  },
  MANAGER: {
    // Add manager endpoints here
  },
  WORKER: {
    // Add worker endpoints here
  },
};

export default API_BASE_URL;

