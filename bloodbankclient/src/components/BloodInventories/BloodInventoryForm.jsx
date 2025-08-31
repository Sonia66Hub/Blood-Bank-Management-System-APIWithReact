import React, { useState, useEffect } from 'react';
import { createBloodInventory, getBloodInventoryById, updateBloodInventory, getBloodInventories } from '../../services/bloodInventoryService';
import { getBloodGroupsForInventoryForm } from '../../services/bloodInventoryService';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ এই লাইনটি ঠিক করা হয়েছে
import { Form, Button } from 'react-bootstrap';

const BloodInventoryForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    inventoryId: 0,
    bloodGroupId: '',
    quantityML: '',
    storageLocation: '',
    lastUpdated: '',
  });
  const [availableBloodGroups, setAvailableBloodGroups] = useState([]);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const allGroupsRes = await getBloodGroupsForInventoryForm();
        const existingInventoriesRes = await getBloodInventories();
        const existingInventoryBloodGroupIds = new Set(
          existingInventoriesRes.data.map(item => item.bloodGroupId)
        );

        if (isEdit) {
          const inventoryRes = await getBloodInventoryById(id);
          const currentInventory = inventoryRes.data;
          setForm({
            inventoryId: currentInventory.inventoryId,
            bloodGroupId: currentInventory.bloodGroupId,
            quantityML: currentInventory.quantityML,
            storageLocation: currentInventory.storageLocation || '',
            lastUpdated: currentInventory.lastUpdated,
          });

          setAvailableBloodGroups(allGroupsRes.data.filter(
            group => group.bloodGroupId === currentInventory.bloodGroupId
          ));

        } else {
          const filteredGroups = allGroupsRes.data.filter(
            group => !existingInventoryBloodGroupIds.has(group.bloodGroupId)
          );
          setAvailableBloodGroups(filteredGroups);

          if (filteredGroups.length > 0) {
            setForm(prev => ({ ...prev, bloodGroupId: filteredGroups[0].bloodGroupId }));
          } else {
            setForm(prev => ({ ...prev, bloodGroupId: '' }));
          }
          setForm(prev => ({ ...prev, quantityML: '', storageLocation: '', lastUpdated: '' }));
        }
      } catch (err) {
        console.error('Failed to load form data:', err);
        alert('Failed to load necessary data for the form.');
        navigate('/inventories');
      }
    };

    loadFormData();
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "quantityML" ? parseInt(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bloodGroupId: parseInt(form.bloodGroupId),
        quantityML: parseInt(form.quantityML),
        storageLocation: form.storageLocation,
      };

      if (isEdit) {
        payload.inventoryId = parseInt(id);
        await updateBloodInventory(id, payload);
      } else {
        await createBloodInventory(payload);
      }
      navigate('/inventories');
    } catch (err) {
      console.error('Failed to save blood inventory:', err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        alert(`Failed to save blood inventory: ${err.response.data}`);
      } else if (err.response && err.response.data && err.response.data.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat().join('\n');
        alert(`Failed to save blood inventory:\n${errorMessages}`);
      } else {
        alert('Failed to save blood inventory. Please check console for details.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>{isEdit ? 'Edit Blood Inventory' : 'Add Blood Inventory'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="bloodGroupId">
          <Form.Label>Blood Group</Form.Label>
          <Form.Select
            name="bloodGroupId"
            value={form.bloodGroupId}
            onChange={handleChange}
            required
            disabled={isEdit}
          >
            <option value="">-- Select Blood Group --</option>
            {availableBloodGroups.map(group => (
              <option key={group.bloodGroupId} value={group.bloodGroupId}>
                {group.groupName}
              </option>
            ))}
          </Form.Select>
          {isEdit && <Form.Text className="text-muted">Blood Group cannot be changed for existing inventory.</Form.Text>}
          {!isEdit && availableBloodGroups.length === 0 && (
            <Form.Text className="text-danger">No blood groups available for new inventory. All groups already have inventory records.</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantityML">
          <Form.Label>Quantity (ml)</Form.Label>
          <Form.Control
            type="number"
            name="quantityML"
            value={form.quantityML}
            onChange={handleChange}
            required
            min="0"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="storageLocation">
          <Form.Label>Storage Location</Form.Label>
          <Form.Control
            type="text"
            name="storageLocation"
            value={form.storageLocation}
            onChange={handleChange}
            maxLength="150"
          />
        </Form.Group>

        {isEdit && (
          <Form.Group className="mb-3" controlId="lastUpdated">
            <Form.Label>Last Updated</Form.Label>
            <Form.Control
              type="text"
              value={new Date(form.lastUpdated).toLocaleString()}
              readOnly
              disabled
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit" disabled={!isEdit && availableBloodGroups.length === 0}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/inventories')} className="ms-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default BloodInventoryForm;