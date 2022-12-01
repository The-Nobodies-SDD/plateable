import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div className="landing">
      <h1>Plateable</h1>
        <div className="hero">
          <h1 className="display-2 mb-3">Finding recipes has never been easier</h1>
          <h5 className="mb-4">Generate recipes based on what you have available and keep track of what is in your pantry</h5>
          
          <Link to="/login">
            <Button variant="outline-dark">Sign Up</Button>
          </Link>
        </div>
    </div>
  );
};

export default Landing;