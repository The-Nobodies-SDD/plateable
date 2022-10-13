import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Nav:FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/pantry">Pantry</Link>
    </div>
  )
};

export default Nav;