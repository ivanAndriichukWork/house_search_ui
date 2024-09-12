import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl ? `${apiUrl}/api` : 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  ( config ) => {

    const token = localStorage.getItem('token');
    if ( token ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  ( error ) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  ( response ) => {
    return response;
  },
  ( error ) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
