import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/pantry">Pantry</Link>
      <Link to="/grocery">Grocery</Link>
      <Link to="/recipes">Recipe Search</Link>
      <Link to="/saved">Saved Recipes</Link>
    </div>
  )
};

export default Nav;