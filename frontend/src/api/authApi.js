import axiosInstance from '../config/axios';

export const authApi = {
  // Register new user
  register: async ({ name, email, password }) => {
    const response = await axiosInstance.post('/auth/register', {
      name,
      email,
      password,
    });
    console.log("Response for auth", response.data);
    return response.data;
  },

  // Login user
  login: async ({ email, password }) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },

  // Get current user info
  me: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
};

export const adminApi = {
  // Admin: Get all users
  users: {
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
  },

  // Admin: Get system statistics
  stats: {
    getStats: async () => {
      const response = await axiosInstance.get('/auth/admin/stats');
      return response.data;
    },
  },
};
