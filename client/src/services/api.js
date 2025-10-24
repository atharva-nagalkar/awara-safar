import axios from 'axios';

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Trek Services
export const trekService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/treks?${params}`);
    return response.data;
  },

  getUpcoming: async () => {
    const response = await api.get('/treks/upcoming');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/treks/${id}`);
    return response.data;
  },

  create: async (trekData) => {
    const response = await api.post('/treks', trekData);
    return response.data;
  },

  update: async (id, trekData) => {
    const response = await api.put(`/treks/${id}`, trekData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/treks/${id}`);
    return response.data;
  }
};

// Booking Services
export const bookingService = {
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  update: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};

// Contact Service
export const contactService = {
  send: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  }
};

// Upload Service
export const uploadService = {
  uploadTrekImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/uploads/trek-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data; // { success, url }
  }
};

export default {
  trek: trekService,
  booking: bookingService,
  contact: contactService,
  upload: uploadService
};
