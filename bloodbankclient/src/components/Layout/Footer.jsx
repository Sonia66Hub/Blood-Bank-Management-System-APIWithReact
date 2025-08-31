import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container text-center">
        <span className="text-muted">&copy; {new Date().getFullYear()} Blood Bank Management. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;