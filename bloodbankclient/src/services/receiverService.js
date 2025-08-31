import axios from 'axios';

// !!! IMPORTANT: Set your backend API base URL correctly
const API_URL = 'http://localhost:5269/api/Receivers'; // <-- VERIFY THIS URL

export const getReceivers = () => {
  return axios.get(API_URL);
};

export const getReceiverById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createReceiver = (receiverData) => {
  return axios.post(API_URL, receiverData);
};

export const updateReceiver = (id, receiverData) => {
  return axios.put(`${API_URL}/${id}`, receiverData);
};

export const deleteReceiver = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// For dropdowns in receiver forms (to select blood group)
export const getBloodGroupsForReceiverForm = () => {
    return axios.get('http://localhost:5269/api/BloodGroups'); // Directly call BloodGroups API
};