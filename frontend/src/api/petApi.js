import axiosInstance from '../config/axios';

export const petApi = {
  // Get all pets with filters
  getAll: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    const response = await axiosInstance.get(`/pets?${params}`);
    return response.data;
  },

  // Get featured pets (homepage)
  getFeatured: async () => {
    const response = await axiosInstance.get('/pets/featured');
    return response.data;
  },

  // Get pet by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/pets/${id}`);
    return response.data;
  },

  // Admin: Create pet
  create: async (petData) => {
    const response = await axiosInstance.post('/pets/admin/create', petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Admin: Update pet
  update: async (id, petData) => {
    const response = await axiosInstance.put(`/pets/admin/update/${id}`, petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Admin: Delete pet
  delete: async (id) => {
    const response = await axiosInstance.delete(`/pets/admin/delete/${id}`);
    return response.data;
  },
};
