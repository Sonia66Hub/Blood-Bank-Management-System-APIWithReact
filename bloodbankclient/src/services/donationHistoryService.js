import axios from 'axios';

// !!! IMPORTANT: Set your backend API base URL correctly
const API_URL = 'http://localhost:5269/api/DonationHistories'; // <-- VERIFY THIS URL

export const getDonationHistories = () => {
  return axios.get(API_URL);
};

export const getDonationHistoryById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createDonationHistory = (historyData) => {
  return axios.post(API_URL, historyData);
};

export const updateDonationHistory = (id, historyData) => {
  return axios.put(`${API_URL}/${id}`, historyData);
};

export const deleteDonationHistory = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};