import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const authToken = localStorage.getItem('authToken');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  if (authToken && tokenExpiry) {
    const isExpired = Date.now() > Number(tokenExpiry);

    if (isExpired) {
      console.warn('Token expirado. Cancelando requisição.');

      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');

      window.dispatchEvent(new Event('logout'));

      return Promise.reject(new Error('Token expirado'));
    }

    config.headers.Authorization = `Bearer ${authToken}`;
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
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  },
);
