import React, { useEffect, useState } from 'react';
import { getDonationHistoryById, deleteDonationHistory } from '../../services/donationHistoryService';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsArrowLeft, BsPencil, BsTrash, BsHeartPulse } from 'react-icons/bs'; // Using BsHeartPulse for Donation History icon

const DonationHistoryDetails = () => {
  const { id } = useParams();
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDonationHistoryById(id)
        .then(res => setHistory(res.data))
        .catch(err => {
          console.error('Failed to fetch donation history details:', err);
          alert('Failed to load donation history details.');
          navigate('/donationhistories');
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this donation history record?')) {
      try {
        await deleteDonationHistory(id);
        navigate('/donationhistories');
      } catch (err) {
        console.error('Failed to delete donation history:', err);
        alert('Failed to delete donation history.');
      }
    }
  };

  if (!history) {
    return <p className="text-center mt-4">Loading donation history details...</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px', background: '#f8f9fa' }} className="mt-4 shadow">
        <Card.Header className="bg-danger text-white text-center fs-5">
          <BsHeartPulse className="me-2" />
          Donation History Details
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col xs={4}><strong>ID:</strong></Col>
            <Col>{history.donationId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Donor ID:</strong></Col>
            <Col>{history.donorId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Donation Date:</strong></Col>
            <Col>{new Date(history.donationDate).toLocaleDateString()}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Location:</strong></Col>
            <Col>{history.donationLocation || 'N/A'}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Notes:</strong></Col>
            <Col>{history.notes || 'N/A'}</Col>
          </Row>
          <Row>
            <Col xs={4}><strong>Created At:</strong></Col>
            <Col>{new Date(history.createdAt).toLocaleString()}</Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate('/donationhistories')}>
              <BsArrowLeft className="me-1" /> Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/donationhistories/edit/${history.donationId}`)}>
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

export default DonationHistoryDetails;