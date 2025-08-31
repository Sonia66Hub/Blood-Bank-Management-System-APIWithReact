import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Global App-specific CSS

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Page Components
import Home from './pages/Home';
import 'animate.css';

// BloodGroups Components
import BloodGroupList from './components/BloodGroups/BloodGroupList';
import BloodGroupForm from './components/BloodGroups/BloodGroupForm';
import BloodGroupDetails from './components/BloodGroups/BloodGroupDetails';

// BloodInventories Components
import BloodInventoryList from './components/BloodInventories/BloodInventoryList';
import BloodInventoryForm from './components/BloodInventories/BloodInventoryForm';
import BloodInventoryDetails from './components/BloodInventories/BloodInventoryDetails';

// Donors Components
import DonorList from './components/Donors/DonorList';
import DonorForm from './components/Donors/DonorForm';
import DonorDetails from './components/Donors/DonorDetails';

// Receivers Components
import ReceiverList from './components/Receivers/ReceiverList';
import ReceiverForm from './components/Receivers/ReceiverForm';
import ReceiverDetails from './components/Receivers/ReceiverDetails';

// DonationHistories Components
import DonationHistoryList from './components/DonationHistories/DonationHistoryList';
import DonationHistoryForm from './components/DonationHistories/DonationHistoryForm';
import DonationHistoryDetails from './components/DonationHistories/DonationHistoryDetails';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        {/* Home page route: full screen hero, container সরানো */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* সমস্ত অন্য routes container এর ভিতরে রাখছি */}
          <Route
            path="/bloodgroups"
            element={
              <div className="container flex-grow-1">
                <BloodGroupList />
              </div>
            }
          />
          <Route
            path="/bloodgroups/add"
            element={
              <div className="container flex-grow-1">
                <BloodGroupForm />
              </div>
            }
          />
          <Route
            path="/bloodgroups/edit/:id"
            element={
              <div className="container flex-grow-1">
                <BloodGroupForm />
              </div>
            }
          />
          <Route
            path="/bloodgroups/:id"
            element={
              <div className="container flex-grow-1">
                <BloodGroupDetails />
              </div>
            }
          />

          <Route
            path="/inventories"
            element={
              <div className="container flex-grow-1">
                <BloodInventoryList />
              </div>
            }
          />
          <Route
            path="/inventories/add"
            element={
              <div className="container flex-grow-1">
                <BloodInventoryForm />
              </div>
            }
          />
          <Route
            path="/inventories/edit/:id"
            element={
              <div className="container flex-grow-1">
                <BloodInventoryForm />
              </div>
            }
          />
          <Route
            path="/inventories/:id"
            element={
              <div className="container flex-grow-1">
                <BloodInventoryDetails />
              </div>
            }
          />

          <Route
            path="/donors"
            element={
              <div className="container flex-grow-1">
                <DonorList />
              </div>
            }
          />
          <Route
            path="/donors/add"
            element={
              <div className="container flex-grow-1">
                <DonorForm />
              </div>
            }
          />
          <Route
            path="/donors/edit/:id"
            element={
              <div className="container flex-grow-1">
                <DonorForm />
              </div>
            }
          />
          <Route
            path="/donors/:id"
            element={
              <div className="container flex-grow-1">
                <DonorDetails />
              </div>
            }
          />

          <Route
            path="/receivers"
            element={
              <div className="container flex-grow-1">
                <ReceiverList />
              </div>
            }
          />
          <Route
            path="/receivers/add"
            element={
              <div className="container flex-grow-1">
                <ReceiverForm />
              </div>
            }
          />
          <Route
            path="/receivers/edit/:id"
            element={
              <div className="container flex-grow-1">
                <ReceiverForm />
              </div>
            }
          />
          <Route
            path="/receivers/:id"
            element={
              <div className="container flex-grow-1">
                <ReceiverDetails />
              </div>
            }
          />

          <Route
            path="/donationhistories"
            element={
              <div className="container flex-grow-1">
                <DonationHistoryList />
              </div>
            }
          />
          <Route
            path="/donationhistories/add"
            element={
              <div className="container flex-grow-1">
                <DonationHistoryForm />
              </div>
            }
          />
          <Route
            path="/donationhistories/edit/:id"
            element={
              <div className="container flex-grow-1">
                <DonationHistoryForm />
              </div>
            }
          />
          <Route
            path="/donationhistories/:id"
            element={
              <div className="container flex-grow-1">
                <DonationHistoryDetails />
              </div>
            }
          />

          {/* Fallback for unknown routes */}
          <Route
            path="*"
            element={
              <div className="container flex-grow-1">
                <h2>404 Not Found</h2>
              </div>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
