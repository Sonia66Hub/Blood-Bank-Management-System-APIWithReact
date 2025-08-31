import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero-section d-flex align-items-center justify-content-center text-white">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="display-3 home-title mb-4 animate__animated animate__fadeInDown">
              Your Lifeline: Blood Bank Management
            </h1>
            <p className="lead home-subtitle mb-5 animate__animated animate__fadeInUp animate__delay-1s">
              Connecting donors with recipients, managing vital blood resources, and saving lives every day.
            </p>
            <div className="home-actions animate__animated animate__zoomIn animate__delay-2s">
              <Link to="/donors">
                <Button variant="danger" size="lg" className="me-3 mb-3 custom-button">
                  Become a Donor
                </Button>
              </Link>
              <Link to="/inventories">
                <Button variant="light" size="lg" className="mb-3 custom-button text-danger border-danger">
                  Check Blood Availability
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
