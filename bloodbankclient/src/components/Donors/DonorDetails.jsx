import React, { useEffect, useState } from 'react';
import { getDonorById, deleteDonor } from '../../services/donorService';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';
import { BsArrowLeft, BsPencil, BsTrash, BsPersonFill } from 'react-icons/bs'; // Using BsPersonFill for Donor icon

const DonorDetails = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getDonorById(id)
        .then(res => setDonor(res.data))
        .catch(err => {
          console.error('Failed to fetch donor details:', err);
          alert('Failed to load donor details.');
          navigate('/donors');
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      try {
        await deleteDonor(id);
        navigate('/donors');
      } catch (err) {
        console.error('Failed to delete donor:', err);
        alert('Failed to delete donor.');
      }
    }
  };

  if (!donor) {
    return <p className="text-center mt-4">Loading donor details...</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px', background: '#f8f9fa' }} className="mt-4 shadow">
        <Card.Header className="bg-danger text-white text-center fs-5">
          <BsPersonFill className="me-2" />
          Donor Information
        </Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col xs={4}><strong>ID:</strong></Col>
            <Col>{donor.donorId}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Name:</strong></Col>
            <Col>{donor.donorName}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Date of Birth:</strong></Col>
            <Col>{donor.dateOfBirth ? new Date(donor.dateOfBirth).toLocaleDateString() : 'N/A'}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Gender:</strong></Col>
            <Col>{donor.gender}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Blood Group:</strong></Col>
            <Col>{donor.bloodGroupName}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Mobile No:</strong></Col>
            <Col>{donor.mobileNo}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Email:</strong></Col>
            <Col>{donor.email || 'N/A'}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Address:</strong></Col>
            <Col>{donor.address || 'N/A'}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Last Donation:</strong></Col>
            <Col>{donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'N/A'}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Created At:</strong></Col>
            <Col>{new Date(donor.createdAt).toLocaleString()}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4}><strong>Updated At:</strong></Col>
            <Col>{donor.updatedAt ? new Date(donor.updatedAt).toLocaleString() : 'N/A'}</Col>
          </Row>

          {donor.picture && (
            <Row className="mb-2">
              <Col xs={4}><strong>Picture:</strong></Col>
              <Col>
                <img src={donor.picture} alt="Donor" className="img-thumbnail" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }} />
              </Col>
            </Row>
          )}
        </Card.Body>
        <Card.Footer className="text-center">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => navigate('/donors')}>
              <BsArrowLeft className="me-1" /> Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/donors/edit/${donor.donorId}`)}>
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

export default DonorDetails;