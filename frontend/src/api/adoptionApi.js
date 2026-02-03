import axiosInstance from '../config/axios';

export const adoptionApi = {
  // Create adoption application
  create: async (adoptionData) => {
    console.log('Creating adoption application with data:', adoptionData);
    const response = await axiosInstance.post('/adoption', adoptionData);
    return response.data;
  },

  // Admin: Get all adoptions
  getAll: async (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    const response = await axiosInstance.get(`/adoption/admin/all?${params}`);
    return response.data;
  },

  // Admin: Get adoption by ID
  getById: async (id) => {
    const response = await axiosInstance.get(`/adoption/admin/${id}`);
    return response.data;
  },

  // Admin: Update adoption status
  updateStatus: async (id, status) => {
    const response = await axiosInstance.put(`/adoption/admin/${id}/status`, { status });
    return response.data;
  },

  // Admin: Delete adoption
  delete: async (id) => {
    const response = await axiosInstance.delete(`/adoption/admin/${id}`);
    return response.data;
  },
};
