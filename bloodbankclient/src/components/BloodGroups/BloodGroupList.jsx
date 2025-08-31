import React, { useEffect, useState } from 'react';
import { getBloodGroups, deleteBloodGroup } from '../../services/bloodGroupService';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup, Table } from 'react-bootstrap'; // Table যোগ করা হয়েছে
import { BsArrowLeft, BsPencil, BsTrash, BsDropletFill } from 'react-icons/bs';

const BloodGroupList = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBloodGroups();
  }, []);

  const loadBloodGroups = async () => {
    try {
      const res = await getBloodGroups();
      setBloodGroups(res.data);
    } catch (err) {
      console.error('Failed to load blood groups:', err);
      alert('Failed to load blood group data.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blood group?')) {
      try {
        await deleteBloodGroup(id);
        loadBloodGroups(); // Refresh the list
      } catch (err) {
        console.error('Failed to delete blood group:', err);
        if (err.response && err.response.data) {
          alert(`Failed to delete blood group: ${err.response.data}`);
        } else {
          alert('Failed to delete blood group. It might be associated with donors or receivers.');
        }
      }
    }
  };

  return (
    <div className="mt-4">
      <h2>Blood Group List</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/bloodgroups/add')}>Add Blood Group</button>
      <Table striped bordered hover responsive> {/* Table component ব্যবহার করুন */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Group Name</th>
            <th>Description</th> {/* ✅ নতুন যোগ করা হয়েছে */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bloodGroups.length > 0 ? (
            bloodGroups.map(group => (
              <tr key={group.bloodGroupId}>
                <td>{group.bloodGroupId}</td>
                <td>{group.groupName}</td>
                <td>{group.description || 'N/A'}</td> {/* ✅ নতুন যোগ করা হয়েছে */}
                <td>
                  <button className="btn btn-info btn-sm me-1" onClick={() => navigate(`/bloodgroups/${group.bloodGroupId}`)}>View</button>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => navigate(`/bloodgroups/edit/${group.bloodGroupId}`)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(group.bloodGroupId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No blood groups found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default BloodGroupList;