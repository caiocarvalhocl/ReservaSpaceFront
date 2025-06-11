import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', // Change to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized request. Token might be expired or invalid.');
      // You would typically dispatch a LOGOUT action here via a global event emitter
      // or directly if you can access the UserContext dispatch.
      // For now, we'll just remove the token and suggest a refresh/redirect.
      localStorage.removeItem('authToken');
      // Optionally: Trigger a global event to inform other parts of the app to log out
      // window.dispatchEvent(new Event('logout'));
      // Or if using React Router, navigate to login:
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
