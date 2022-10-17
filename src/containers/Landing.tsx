import React from 'react';
import image from '../assets/landing.jpg'
//import './styles/containers/landing.scss'

const Landing = () => {
  return (
    <div style={{backgroundImage: 'url(' + image + ')'}} >
      <h1>Landing Page</h1>
    </div>
  );
};

export default Landing;