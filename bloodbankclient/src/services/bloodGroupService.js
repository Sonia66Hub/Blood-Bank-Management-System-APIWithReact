import axios from 'axios';

// !!! IMPORTANT: Set your backend API base URL correctly
const API_URL = 'http://localhost:5269/api/BloodGroups'; // <-- VERIFY THIS URL

export const getBloodGroups = () => {
  return axios.get(API_URL);
};

export const getBloodGroupById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createBloodGroup = (groupData) => {
  return axios.post(API_URL, groupData);
};

export const updateBloodGroup = (id, groupData) => {
  return axios.put(`${API_URL}/${id}`, groupData);
};

export const deleteBloodGroup = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};