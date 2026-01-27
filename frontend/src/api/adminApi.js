import axiosInstance from '../config/axios';

// User Management APIs
export const apiAdminUsers = {
  getAll: async () => {
    const response = await axiosInstance.get('/auth/admin/users');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/auth/admin/user/${id}`);
    return response.data;
  },

  updateRole: async (id, isAdmin) => {
    const response = await axiosInstance.put(`/auth/admin/user/${id}/role`, {
      isAdmin,
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/auth/admin/user/${id}`);
    return response.data;
  },
};

// System Statistics API
export const apiAdminStats = {
  getStats: async () => {
    const response = await axiosInstance.get('/auth/admin/stats');
    return response.data;
  },
};

// Pet Management APIs (Admin)
export const apiAdminPets = {
  create: async (petData) => {
    const response = await axiosInstance.post('/pets/admin/create', petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, petData) => {
    const response = await axiosInstance.put(`/pets/admin/update/${id}`, petData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/pets/admin/delete/${id}`);
    return response.data;
  },
};

// Adoption Management APIs (Admin)
export const apiAdminAdoptions = {
  getAll: async () => {
    const response = await axiosInstance.get('/adoption/admin/all');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/adoption/admin/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await axiosInstance.put(`/adoption/admin/${id}/status`, {
      status,
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await axiosInstance.delete(`/adoption/admin/${id}`);
    return response.data;
  },
};

export default {
  apiAdminUsers,
  apiAdminStats,
  apiAdminPets,
  apiAdminAdoptions,
};
