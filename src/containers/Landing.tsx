import React from 'react';
import image from './assets/landing.jpg'

const Landing = () => {
  return (
    <div style={{ backgroundImage: 'url(${image})' }}>
      Landing Page
    </div>
  );
};

export default Landing;