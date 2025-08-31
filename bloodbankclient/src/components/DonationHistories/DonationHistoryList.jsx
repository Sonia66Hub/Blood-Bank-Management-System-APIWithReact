import React, { useEffect, useState } from 'react';
import { getDonationHistories, deleteDonationHistory } from '../../services/donationHistoryService';
import { useNavigate } from 'react-router-dom';

const DonationHistoryList = () => {
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDonationHistories();
  }, []);

  const loadDonationHistories = async () => {
    try {
      const res = await getDonationHistories();
      setHistories(res.data);
    } catch (err) {
      console.error('Failed to load donation histories:', err);
      alert('Failed to load donation history data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation history record?')) {
      try {
        await deleteDonationHistory(id);
        loadDonationHistories(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete donation history:', err);
        alert('Failed to delete donation history.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>Donation History List</h2>
      {/* "Add Donation" button for consistency if you decide to have a form for it later */}
      <button className="btn btn-success mb-3" onClick={() => navigate('/donationhistories/add')}>Add Donation</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor ID</th>
            <th>Donation Date</th>
            <th>Location</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {histories.length > 0 ? (
            histories.map(history => (
              <tr key={history.donationId}>
                <td>{history.donationId}</td>
                <td>{history.donorId}</td>
                <td>{new Date(history.donationDate).toLocaleDateString()}</td>
                <td>{history.donationLocation || 'N/A'}</td>
                <td>{history.notes || 'N/A'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/donationhistories/${history.donationId}`)}>View</button>
                  {/* "Edit" button for consistency, leading to a form */}
                  <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/donationhistories/edit/${history.donationId}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(history.donationId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No donation histories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistoryList;