import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">Blood Bank</Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ✅ Home button added */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bloodgroups">Blood Groups</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inventories">Blood Inventory</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donors">Donors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/receivers">Receivers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donationhistories">Donation History</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
