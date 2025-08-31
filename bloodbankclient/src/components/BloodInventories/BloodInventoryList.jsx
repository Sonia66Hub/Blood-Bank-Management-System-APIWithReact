import React, { useEffect, useState } from 'react';
import { getBloodInventories, deleteBloodInventory } from '../../services/bloodInventoryService';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'; // Table যোগ করা হয়েছে

const BloodInventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBloodInventories();
  }, []);

  const loadBloodInventories = async () => {
    try {
      const res = await getBloodInventories();
      setInventories(res.data);
    } catch (err) {
      console.error('Failed to load blood inventories:', err);
      alert('Failed to load blood inventory data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory record?')) {
      try {
        await deleteBloodInventory(id);
        loadBloodInventories(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete blood inventory:', err);
        alert('Failed to delete blood inventory.');
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>Blood Inventory List</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/inventories/add')}>Add Inventory</button>
      <Table striped bordered hover responsive> {/* Table component ব্যবহার করুন */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Blood Group</th>
            <th>Quantity (ml)</th> {/* ✅ নতুন যোগ করা হয়েছে */}
            <th>Storage Location</th> {/* ✅ নতুন যোগ করা হয়েছে */}
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.length > 0 ? (
            inventories.map(item => (
              <tr key={item.inventoryId}>
                <td>{item.inventoryId}</td>
                <td>{item.bloodGroupName}</td>
                <td>{item.quantityML}</td> {/* ✅ নতুন যোগ করা হয়েছে */}
                <td>{item.storageLocation || 'N/A'}</td> {/* ✅ নতুন যোগ করা হয়েছে */}
                <td>{new Date(item.lastUpdated).toLocaleString()}</td>
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/inventories/${item.inventoryId}`)}>View</button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/inventories/edit/${item.inventoryId}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.inventoryId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No blood inventory found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BloodInventoryList;