import React from 'react';
import image from '../assets/landing.jpg'
//import './styles/containers/landing.scss'

const Landing = () => {
  return (
    <div style={{backgroundImage: 'url(' + image + ')', height: "100vh", width: "100vw",
     backgroundPosition: 'center', backgroundSize: "cover", backgroundRepeat: 'no-repeat'}} >
      <h1>Landing Page</h1>
    </div>
  );
};

export default Landing;