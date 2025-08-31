import React, { useEffect, useState } from 'react';
import { getDonors, deleteDonor } from '../../services/donorService';
import { useNavigate } from 'react-router-dom';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const res = await getDonors();
      setDonors(res.data);
    } catch (err) {
      console.error('Failed to load donors:', err);
      alert('Failed to load donor data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await deleteDonor(id);
        loadDonors(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete donor:', err);
        alert('Failed to delete donor.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>Donor List</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/donors/add')}>Add Donor</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Mobile No</th>
            <th>Last Donation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.length > 0 ? (
            donors.map(donor => (
              <tr key={donor.donorId}>
                <td>{donor.donorId}</td>
                <td>
                  {donor.picture ? (
                     <img
                      src={donor.picture}
                      alt="Donor"
                      style={{
                         width: '50px',
                          height: '50px',
                           objectFit: 'cover',
                            borderRadius: '50%',
                            }}
                            />
                             ) : (
                               'N/A'
                                )}
                </td>

                <td>{donor.donorName}</td>
                <td>{donor.bloodGroupName}</td>
                <td>{donor.mobileNo}</td>
                <td>{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/donors/${donor.donorId}`)}>View</button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/donors/edit/${donor.donorId}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(donor.donorId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No donors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorList;