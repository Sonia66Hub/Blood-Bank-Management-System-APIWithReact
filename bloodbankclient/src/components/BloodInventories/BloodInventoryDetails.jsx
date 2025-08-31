import React, { useEffect, useState } from 'react';
import { getBloodInventoryById, deleteBloodInventory } from '../../services/bloodInventoryService';
import { getBloodGroupById } from '../../services/bloodGroupService'; // To fetch blood group name
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsArrowLeft, BsPencil, BsTrash, BsBoxSeam } from 'react-icons/bs';

const BloodInventoryDetails = () => {
  const { id } = useParams();
  const [inventory, setInventory] = useState(null);
  const [bloodGroupName, setBloodGroupName] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBloodInventoryById(id)
        .then(res => {
          setInventory(res.data);
          if (res.data.bloodGroupId) {
            getBloodGroupById(res.data.bloodGroupId)
              .then(bgRes => setBloodGroupName(bgRes.data.groupName))
              .catch(bgErr => {
                console.error('Failed to fetch blood group name for inventory:', bgErr);
                setBloodGroupName('N/A');
              });
          } else {
            setBloodGroupName('N/A');
          }
        })
        .catch(err => {
          console.error('Failed to fetch blood inventory details:', err);
          alert('Failed to load blood inventory details.');
          navigate('/inventories');
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this inventory record?')) {
      try {
        await deleteBloodInventory(id);
        navigate('/inventories');
      } catch (err) {
        console.error('Failed to delete blood inventory:', err);
        alert('Failed to delete blood inventory.');
      }
    }
  };

  if (!inventory) {
    return <p className="text-center mt-4">Loading blood inventory details...</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px', background: '#f8f9fa' }} className="mt-4 shadow">
        <Card.Header className="bg-danger text-white text-center fs-5">
          <BsBoxSeam className="me-2" />
          Blood Inventory Information
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col xs={4}><strong>ID:</strong></Col>
            <Col>{inventory.inventoryId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Blood Group:</strong></Col>
            <Col>{bloodGroupName}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Quantity (ml):</strong></Col>
            <Col>{inventory.quantityML}</Col> {/* ✅ নতুন যোগ করা হয়েছে */}
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Storage Location:</strong></Col>
            <Col>{inventory.storageLocation || 'N/A'}</Col> {/* ✅ নতুন যোগ করা হয়েছে */}
          </Row>
          <Row>
            <Col xs={4}><strong>Last Updated:</strong></Col>
            <Col>{new Date(inventory.lastUpdated).toLocaleString()}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate('/inventories')}>
              <BsArrowLeft className="me-1" /> Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/inventories/edit/${inventory.inventoryId}`)}>
              <BsPencil className="me-1" /> Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <BsTrash className="me-1" /> Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default BloodInventoryDetails;