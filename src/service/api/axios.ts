import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333', // Change to your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add this in the same axios.ts file
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // or use cookies, context, etc.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
