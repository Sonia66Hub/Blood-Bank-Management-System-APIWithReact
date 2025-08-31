import React, { useState, useEffect } from 'react';
import { createDonationHistory, getDonationHistoryById, updateDonationHistory } from '../../services/donationHistoryService';
import { getDonors } from '../../services/donorService'; // To get donor options for dropdown
import { useNavigate, useParams } from 'react-router-dom';

const DonationHistoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    donationId: 0,
    donorId: '', // Will store the selected Donor ID
    donationDate: '', // Format 'YYYY-MM-DD' for input type="date"
    donationLocation: '',
    notes: '',
    createdAt: '', // Not sent in POST/PUT, handled by backend
  });
  const [donors, setDonors] = useState([]); // State to store donors for dropdown

  useEffect(() => {
    // Load donors for the dropdown
    getDonors()
      .then(res => {
        setDonors(res.data);
        // If adding a new record and donors exist, pre-select the first one
        if (!isEdit && res.data.length > 0) {
          setForm(prev => ({ ...prev, donorId: res.data[0].donorId }));
        }
      })
      .catch(err => console.error("Failed to load donors for dropdown:", err));

    if (isEdit) {
      getDonationHistoryById(id)
        .then(res => {
          setForm({
            donationId: res.data.donationId,
            donorId: res.data.donorId,
            donationDate: res.data.donationDate ? new Date(res.data.donationDate).toISOString().split('T')[0] : '',
            donationLocation: res.data.donationLocation || '',
            notes: res.data.notes || '',
            createdAt: res.data.createdAt,
          });
        })
        .catch(err => {
          console.error('Failed to fetch donation history:', err);
          alert('Failed to load donation history data.');
          navigate('/donationhistories'); // Redirect if data fetch fails
        });
    } else {
      // Initialize for new record, default date to today
      setForm({ donationId: 0, donorId: '', donationDate: new Date().toISOString().split('T')[0], donationLocation: '', notes: '', createdAt: '' });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        donorId: parseInt(form.donorId), // Ensure DonorId is an integer
        donationDate: new Date(form.donationDate), // Convert to Date object for backend
        donationLocation: form.donationLocation,
        notes: form.notes,
      };

      if (isEdit) {
        payload.donationId = parseInt(id); // Include ID in payload for PUT request
        await updateDonationHistory(id, payload);
      } else {
        await createDonationHistory(payload);
      }
      navigate('/donationhistories'); // Redirect to list after success
    } catch (err) {
      console.error('Failed to save donation history:', err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        alert(`Failed to save donation history: ${err.response.data}`);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Failed to save donation history:\n${errorMessages}`);
      } else {
        alert('Failed to save donation history. Please check console for details.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>{isEdit ? 'Edit Donation History' : 'Add Donation History'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="donorId" className="form-label">Donor</label>
          <select
            className="form-select"
            id="donorId"
            name="donorId"
            value={form.donorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Donor --</option>
            {donors.map(donor => (
              <option key={donor.donorId} value={donor.donorId}>
                {donor.donorName} (ID: {donor.donorId})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="donationDate" className="form-label">Donation Date</label>
          <input
            type="date"
            className="form-control"
            id="donationDate"
            name="donationDate"
            value={form.donationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="donationLocation" className="form-label">Donation Location</label>
          <input
            type="text"
            className="form-control"
            id="donationLocation"
            name="donationLocation"
            value={form.donationLocation}
            onChange={handleChange}
            maxLength="150"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            maxLength="500"
          ></textarea>
        </div>

        {isEdit && (
            <div className="mb-3">
                <label className="form-label">Created At</label>
                <input
                    type="text"
                    className="form-control"
                    value={new Date(form.createdAt).toLocaleString()}
                    readOnly
                    disabled
                />
            </div>
        )}

        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/donationhistories')}>Cancel</button>
      </form>
    </div>
  );
};

export default DonationHistoryForm;