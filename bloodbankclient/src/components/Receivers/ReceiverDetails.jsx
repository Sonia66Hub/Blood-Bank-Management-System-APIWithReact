import React, { useEffect, useState } from 'react';
import { getReceiverById, deleteReceiver } from '../../services/receiverService';
import { getBloodGroupById } from '../../services/bloodGroupService'; // To fetch blood group name
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsArrowLeft, BsPencil, BsTrash, BsPersonCheck } from 'react-icons/bs'; // Using BsPersonCheck for Receiver icon

const ReceiverDetails = () => {
  const { id } = useParams();
  const [receiver, setReceiver] = useState(null);
  const [bloodGroupName, setBloodGroupName] = useState('Loading...'); // State for blood group name
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getReceiverById(id)
        .then(res => {
          setReceiver(res.data);
          // Fetch blood group name separately because ReceiverDTO might not include it directly
          if (res.data.bloodGroupId) {
            getBloodGroupById(res.data.bloodGroupId)
              .then(bgRes => setBloodGroupName(bgRes.data.groupName))
              .catch(bgErr => {
                console.error('Failed to fetch blood group name for receiver:', bgErr);
                setBloodGroupName('N/A');
              });
          } else {
            setBloodGroupName('N/A');
          }
        })
        .catch(err => {
          console.error('Failed to fetch receiver details:', err);
          alert('Failed to load receiver details.');
          navigate('/receivers');
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this receiver?')) {
      try {
        await deleteReceiver(id);
        navigate('/receivers');
      } catch (err) {
        console.error('Failed to delete receiver:', err);
        alert('Failed to delete receiver.');
      }
    }
  };

  if (!receiver) {
    return <p className="text-center mt-4">Loading receiver details...</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px', background: '#f8f9fa' }} className="mt-4 shadow">
        <Card.Header className="bg-danger text-white text-center fs-5">
          <BsPersonCheck className="me-2" />
          Receiver Information
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col xs={4}><strong>ID:</strong></Col>
            <Col>{receiver.receiverId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Full Name:</strong></Col>
            <Col>{receiver.fullName}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Blood Group:</strong></Col>
            <Col>{bloodGroupName}</Col> {/* Display fetched name */}
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Contact No:</strong></Col>
            <Col>{receiver.contactNo}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Request Date:</strong></Col>
            <Col>{new Date(receiver.requestDate).toLocaleDateString()}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Status:</strong></Col>
            <Col>{receiver.status}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Address:</strong></Col>
            <Col>{receiver.address || 'N/A'}</Col>
          </Row>
          <Row>
            <Col xs={4}><strong>Created At:</strong></Col>
            <Col>{new Date(receiver.createdAt).toLocaleString()}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate('/receivers')}>
              <BsArrowLeft className="me-1" /> Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/receivers/edit/${receiver.receiverId}`)}>
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

export default ReceiverDetails;