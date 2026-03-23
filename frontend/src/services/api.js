import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transformContent = async (text, mode) => {
  try {
    const response = await api.post('/transform', { text, mode });
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export default api;
