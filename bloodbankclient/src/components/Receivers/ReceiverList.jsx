import React, { useEffect, useState } from 'react';
import { getReceivers, deleteReceiver } from '../../services/receiverService';
import { useNavigate } from 'react-router-dom';

const ReceiverList = () => {
  const [receivers, setReceivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadReceivers();
  }, []);

  const loadReceivers = async () => {
    try {
      const res = await getReceivers();
      setReceivers(res.data);
    } catch (err) {
      console.error('Failed to load receivers:', err);
      alert('Failed to load receiver data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this receiver?')) {
      try {
        await deleteReceiver(id);
        loadReceivers(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete receiver:', err);
        alert('Failed to delete receiver.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>Receiver List</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/receivers/add')}>Add Receiver</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Blood Group ID</th> {/* You might want to display Blood Group Name here if added to DTO */}
            <th>Contact No</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {receivers.length > 0 ? (
            receivers.map(receiver => (
              <tr key={receiver.receiverId}>
                <td>{receiver.receiverId}</td>
                <td>{receiver.fullName}</td>
                <td>{receiver.bloodGroupId}</td> {/* If your DTO doesn't include name, ID will show */}
                <td>{receiver.contactNo}</td>
                <td>{new Date(receiver.requestDate).toLocaleDateString()}</td>
                <td>{receiver.status}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/receivers/${receiver.receiverId}`)}>View</button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/receivers/edit/${receiver.receiverId}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(receiver.receiverId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No receivers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiverList;