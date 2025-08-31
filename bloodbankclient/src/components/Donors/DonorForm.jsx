import React, { useState, useEffect } from 'react';
import { createDonor, getDonorById, updateDonor, getBloodGroupsForDonorForm } from '../../services/donorService';
import { useNavigate, useParams } from 'react-router-dom';

const DonorForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    donorId: 0,
    donorName: '',
    dateOfBirth: '', 
    gender: '',
    bloodGroupId: '',
    mobileNo: '',
    email: '',
    address: '',
    lastDonationDate: '', 
    picture: '', 
    pictureFile: null, 
  });
  const [bloodGroups, setBloodGroups] = useState([]);
  const [selectedPictureFile, setSelectedPictureFile] = useState(null);

  useEffect(() => {
    
    getBloodGroupsForDonorForm()
      .then(res => {
        setBloodGroups(res.data);
        if (!isEdit && res.data.length > 0) {
          setForm(prev => ({ ...prev, bloodGroupId: res.data[0].bloodGroupId }));
        }
      })
      .catch(err => console.error("Failed to load blood groups for donor form:", err));

    if (isEdit) {
      getDonorById(id)
        .then(res => {
          const donorData = res.data;
          setForm({
            donorId: donorData.donorId,
            donorName: donorData.donorName,
            dateOfBirth: donorData.dateOfBirth ? new Date(donorData.dateOfBirth).toISOString().split('T')[0] : '',
            gender: donorData.gender,
            bloodGroupId: donorData.bloodGroupId,
            mobileNo: donorData.mobileNo,
            email: donorData.email || '',
            address: donorData.address || '',
            lastDonationDate: donorData.lastDonationDate ? new Date(donorData.lastDonationDate).toISOString().split('T')[0] : '',
            picture: donorData.picture || '', 
            pictureFile: null, 
          });
        })
        .catch(err => {
          console.error('Failed to fetch donor:', err);
          alert('Failed to load donor data.');
          navigate('/donors');
        });
    } else {
      setForm({
        donorId: 0,
        donorName: '',
        dateOfBirth: '',
        gender: '',
        bloodGroupId: '',
        mobileNo: '',
        email: '',
        address: '',
        lastDonationDate: '',
        picture: '',
        pictureFile: null,
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

  const handleFileChange = (e) => {
    setSelectedPictureFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('DonorName', form.donorName);
    formData.append('Gender', form.gender);
    formData.append('BloodGroupId', form.bloodGroupId); // Should be numeric
    formData.append('MobileNo', form.mobileNo);

    // Optional fields
    if (form.dateOfBirth) formData.append('DateOfBirth', form.dateOfBirth);
    if (form.email) formData.append('Email', form.email);
    if (form.address) formData.append('Address', form.address);
    if (form.lastDonationDate) formData.append('LastDonationDate', form.lastDonationDate);

    // Append the file if selected
    if (selectedPictureFile) {
        formData.append('PictureFile', selectedPictureFile);
    }

    try {
      if (isEdit) {
        await updateDonor(id, formData);
      } else {
        await createDonor(formData);
      }
      navigate('/donors');
    } catch (err) {
      console.error('Failed to save donor:', err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        alert(`Failed to save donor: ${err.response.data}`);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Failed to save donor:\n${errorMessages}`);
      } else {
        alert('Failed to save donor. Please check console for details.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>{isEdit ? 'Edit Donor' : 'Add Donor'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="donorName" className="form-label">Donor Name</label>
          <input
            type="text"
            className="form-control"
            id="donorName"
            name="donorName"
            value={form.donorName}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="dateOfBirth"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
          <label htmlFor="mobileNo" className="form-label">Mobile No</label>
          <input
            type="text"
            className="form-control"
            id="mobileNo"
            name="mobileNo"
            value={form.mobileNo}
            onChange={handleChange}
            required
            maxLength="15"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            maxLength="100"
          />
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
        <div className="mb-3">
          <label htmlFor="lastDonationDate" className="form-label">Last Donation Date</label>
          <input
            type="date"
            className="form-control"
            id="lastDonationDate"
            name="lastDonationDate"
            value={form.lastDonationDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pictureFile" className="form-label">Picture</label>
          <input
            type="file"
            className="form-control"
            id="pictureFile"
            name="pictureFile"
            onChange={handleFileChange}
            accept="image/*"
          />
          {isEdit && form.picture && (
            <div className="mt-2">
              <p>Current Picture:</p>
              <img src={form.picture} alt="Donor" style={{ maxWidth: '150px', maxHeight: '150px' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/donors')}>Cancel</button>
      </form>
    </div>
  );
};

export default DonorForm;