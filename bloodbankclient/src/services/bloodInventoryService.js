import axios from 'axios';

// !!! IMPORTANT: Set your backend API base URL correctly
const API_URL = 'http://localhost:5269/api/BloodInventories'; // <-- VERIFY THIS URL

export const getBloodInventories = () => {
  return axios.get(API_URL);
};

export const getBloodInventoryById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createBloodInventory = (inventoryData) => {
  return axios.post(API_URL, inventoryData);
};

export const updateBloodInventory = (id, inventoryData) => {
  return axios.put(`${API_URL}/${id}`, inventoryData);
};

export const deleteBloodInventory = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// For dropdowns in inventory forms (if needed, e.g., to select blood group)
export const getBloodGroupsForInventoryForm = () => {
    return axios.get('http://localhost:5269/api/BloodGroups'); // Directly call BloodGroups API
};