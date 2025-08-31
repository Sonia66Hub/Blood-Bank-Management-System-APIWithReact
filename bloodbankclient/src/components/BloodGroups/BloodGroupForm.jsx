import React, { useState, useEffect } from 'react';
import { createBloodGroup, getBloodGroupById, updateBloodGroup } from '../../services/bloodGroupService';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Form component ব্যবহার করুন

const BloodGroupForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bloodGroupId: 0,
    groupName: '',
    description: '', // ✅ নতুন যোগ করা হয়েছে
    createdAt: '',
  });

  useEffect(() => {
    if (isEdit) {
      getBloodGroupById(id)
        .then(res => {
          setForm({
            bloodGroupId: res.data.bloodGroupId,
            groupName: res.data.groupName,
            description: res.data.description || '', // ✅ নতুন যোগ করা হয়েছে
            createdAt: res.data.createdAt,
          });
        })
        .catch(err => {
          console.error('Failed to fetch blood group:', err);
          alert('Failed to load blood group data.');
          navigate('/bloodgroups');
        });
    } else {
      setForm({ bloodGroupId: 0, groupName: '', description: '', createdAt: '' });
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
      // payload এ description যোগ করুন
      const payload = {
        groupName: form.groupName,
        description: form.description, // ✅ নতুন যোগ করা হয়েছে
      };

      if (isEdit) {
        // For update, the DTO expects the ID
        await updateBloodGroup(id, {
          bloodGroupId: parseInt(id),
          ...payload // payload এখানে যোগ করুন
        });
      } else {
        await createBloodGroup(payload);
      }
      navigate('/bloodgroups');
    } catch (err) {
      console.error('Failed to save blood group:', err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        alert(`Failed to save blood group: ${err.response.data}`);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Failed to save blood group:\n${errorMessages}`);
      }
      else {
        alert('Failed to save blood group. Please check console for details.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>{isEdit ? 'Edit Blood Group' : 'Add Blood Group'}</h2>
      <Form onSubmit={handleSubmit}> {/* Form component ব্যবহার করুন */}
        <Form.Group className="mb-3" controlId="groupName">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            name="groupName"
            value={form.groupName}
            onChange={handleChange}
            required
            maxLength="10"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description"> {/* ✅ নতুন যোগ করা হয়েছে */}
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" // textarea এর জন্য as="textarea" ব্যবহার করুন
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            maxLength="250"
          />
        </Form.Group>

        {isEdit && (
          <Form.Group className="mb-3" controlId="createdAt">
            <Form.Label>Created At</Form.Label>
            <Form.Control
              type="text"
              value={new Date(form.createdAt).toLocaleString()}
              readOnly
              disabled
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {isEdit ? 'Update' : 'Create'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/bloodgroups')} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default BloodGroupForm;