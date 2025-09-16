import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response.data;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw new Error('Resource not found');
    } else if (error.response?.status === 500) {
      throw new Error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    } else if (!error.response) {
      throw new Error('Network error');
    }
    throw error;
  }
);

export default request;