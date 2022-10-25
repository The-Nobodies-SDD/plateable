import React from 'react';
import image from '../assets/landing.jpg'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"
//import './styles/containers/landing.scss'

const style = {
  margin: "auto",
  padding: "12% 20% 5% 5%",
  color: "black",
}

function SignUpButton() {
  
  return <Link to="/signup">
    <Button variant="outline-dark">
      <span style={{ fontSize: "20px" }}>
        Sign Up
      </span>
    </Button>
  </Link>
}

const Landing = () => {
  return (
    <div style={{backgroundImage: 'url(' + image + ')', height: "100vh", width: "100vw",
     backgroundPosition: 'center', backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundBlendMode: "lighten"}} >
      <h1 style={{fontFamily: "cursive"}}>Plateable</h1>
        <div style={style}>
            <h1 style={{ fontWeight: 'bold', fontSize: "60px" }}>Finding recipes has</h1>
            <h1 style={{ fontWeight: 'bold', fontSize: "60px"}}> never been easier</h1> 
            <p style={{ fontWeight: 'bold', fontSize: "20px"}}>Generate recipes based on what you have available and keep track of</p>
            <p style={{ fontWeight: 'bold', fontSize: "20px"}}>what is in your pantry</p>
            <SignUpButton />
      </div>
    </div>
  );
};

export default Landing;