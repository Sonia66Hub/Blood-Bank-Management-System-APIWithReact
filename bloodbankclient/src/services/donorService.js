import axios from 'axios';

// !!! IMPORTANT: Set your backend API base URL correctly
const API_URL = 'http://localhost:5269/api/Donors'; // <-- VERIFY THIS URL

export const getDonors = () => {
  return axios.get(API_URL);
};

export const getDonorById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createDonor = (donorData) => {
  // donorData needs to be FormData because of file upload
  return axios.post(API_URL, donorData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateDonor = (id, donorData) => {
  // donorData needs to be FormData because of file upload
  return axios.put(`${API_URL}/${id}`, donorData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteDonor = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

// This is for fetching the list of BloodGroups for the dropdown in DonorForm
export const getBloodGroupsForDonorForm = () => {
    return axios.get('http://localhost:5269/api/BloodGroups'); // Directly call BloodGroups API
};