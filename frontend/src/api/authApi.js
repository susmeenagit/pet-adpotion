import axiosInstance from '../config/axios';

export const apiAuth = {
  register: async ({ name, email, password }) => {
    const res = await axiosInstance.post('/auth/register', {
      name,
      email,
      password,
    });
    return res.data;
  },

  login: async ({ email, password }) => {
    const res = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
  },

  me: async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  },
};
