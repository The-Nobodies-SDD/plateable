import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return (
    <div>

      <Nav variant="tabs" defaultActiveKey="/pantry">
        <Nav.Item>
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link to="/pantry">Pantry</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link to="/grocery">Grocery</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
      <Link to="/recipes">Recipe Search</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
      <Link to="/saved">Saved Recipes</Link>
          </Nav.Link>
        </Nav.Item>

      </Nav>
    </div>
  )
};

export default NavBar;