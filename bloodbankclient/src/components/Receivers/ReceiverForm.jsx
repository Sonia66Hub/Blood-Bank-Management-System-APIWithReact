import React, { useState, useEffect } from 'react';
import { createReceiver, getReceiverById, updateReceiver } from '../../services/receiverService';
import { getBloodGroupsForReceiverForm } from '../../services/receiverService'; // To get blood group options
import { useNavigate, useParams } from 'react-router-dom';

const ReceiverForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    receiverId: 0,
    fullName: '',
    bloodGroupId: '', // Will store the selected BloodGroup ID
    contactNo: '',
    requestDate: '', // YYYY-MM-DD
    status: 'Pending', // Default status
    address: '',
    createdAt: '', // Not sent in POST/PUT, handled by backend
  });
  const [bloodGroups, setBloodGroups] = useState([]); // State to store blood groups for dropdown

  useEffect(() => {
    // Load blood groups for dropdown
    getBloodGroupsForReceiverForm()
      .then(res => {
        setBloodGroups(res.data);
        if (!isEdit && res.data.length > 0) {
          setForm(prev => ({ ...prev, bloodGroupId: res.data[0].bloodGroupId }));
        }
      })
      .catch(err => console.error("Failed to load blood groups for receiver form:", err));

    if (isEdit) {
      getReceiverById(id)
        .then(res => {
          const receiverData = res.data;
          setForm({
            receiverId: receiverData.receiverId,
            fullName: receiverData.fullName,
            bloodGroupId: receiverData.bloodGroupId,
            contactNo: receiverData.contactNo,
            requestDate: receiverData.requestDate ? new Date(receiverData.requestDate).toISOString().split('T')[0] : '',
            status: receiverData.status,
            address: receiverData.address || '',
            createdAt: receiverData.createdAt,
          });
        })
        .catch(err => {
          console.error('Failed to fetch receiver:', err);
          alert('Failed to load receiver data.');
          navigate('/receivers');
        });
    } else {
      setForm({
        receiverId: 0,
        fullName: '',
        bloodGroupId: '',
        contactNo: '',
        requestDate: new Date().toISOString().split('T')[0], // Default to today
        status: 'Pending',
        address: '',
        createdAt: '',
      });
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
        fullName: form.fullName,
        bloodGroupId: parseInt(form.bloodGroupId), // Ensure BloodGroupId is an integer
        contactNo: form.contactNo,
        requestDate: new Date(form.requestDate), // Convert to Date object
        status: form.status,
        address: form.address,
      };

      if (isEdit) {
        payload.receiverId = parseInt(id); // Include ID in payload for PUT request
        await updateReceiver(id, payload);
      } else {
        await createReceiver(payload);
      }
      navigate('/receivers');
    } catch (err) {
      console.error('Failed to save receiver:', err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        alert(`Failed to save receiver: ${err.response.data}`);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Failed to save receiver:\n${errorMessages}`);
      } else {
        alert('Failed to save receiver. Please check console for details.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>{isEdit ? 'Edit Receiver' : 'Add Receiver'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bloodGroupId" className="form-label">Blood Group</label>
          <select
            className="form-select"
            id="bloodGroupId"
            name="bloodGroupId"
            value={form.bloodGroupId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Blood Group --</option>
            {bloodGroups.map(group => (
              <option key={group.bloodGroupId} value={group.bloodGroupId}>
                {group.groupName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="contactNo" className="form-label">Contact No</label>
          <input
            type="text"
            className="form-control"
            id="contactNo"
            name="contactNo"
            value={form.contactNo}
            onChange={handleChange}
            required
            maxLength="15"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="requestDate" className="form-label">Request Date</label>
          <input
            type="date"
            className="form-control"
            id="requestDate"
            name="requestDate"
            value={form.requestDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="3"
            maxLength="200"
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
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/receivers')}>Cancel</button>
      </form>
    </div>
  );
};

export default ReceiverForm;