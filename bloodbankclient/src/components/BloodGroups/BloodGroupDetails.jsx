import React, { useEffect, useState } from 'react';
import { getBloodGroupById, deleteBloodGroup } from '../../services/bloodGroupService';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsArrowLeft, BsPencil, BsTrash, BsDropletFill } from 'react-icons/bs';

const BloodGroupDetails = () => {
  const { id } = useParams();
  const [bloodGroup, setBloodGroup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBloodGroupById(id)
        .then(res => setBloodGroup(res.data))
        .catch(err => {
          console.error('Failed to fetch blood group details:', err);
          alert('Failed to load blood group details.');
          navigate('/bloodgroups');
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blood group?')) {
      try {
        await deleteBloodGroup(id);
        navigate('/bloodgroups');
      } catch (err) {
        console.error('Failed to delete blood group:', err);
        alert('Failed to delete blood group. It might be associated with donors or receivers.');
      }
    }
  };

  if (!bloodGroup) {
    return <p className="text-center mt-4">Loading blood group details...</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px', background: '#f8f9fa' }} className="mt-4 shadow">
        <Card.Header className="bg-danger text-white text-center fs-5">
          <BsDropletFill className="me-2" />
          Blood Group Information
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col xs={4}><strong>ID:</strong></Col>
            <Col>{bloodGroup.bloodGroupId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Group Name:</strong></Col>
            <Col>{bloodGroup.groupName}</Col>
          </Row>
          <Row className="mb-2"> {/* ✅ নতুন যোগ করা হয়েছে */}
            <Col xs={4}><strong>Description:</strong></Col>
            <Col>{bloodGroup.description || 'N/A'}</Col>
          </Row>
          <Row>
            <Col xs={4}><strong>Created At:</strong></Col>
            <Col>{new Date(bloodGroup.createdAt).toLocaleString()}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate('/bloodgroups')}>
              <BsArrowLeft className="me-1" /> Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/bloodgroups/edit/${bloodGroup.bloodGroupId}`)}>
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

export default BloodGroupDetails;