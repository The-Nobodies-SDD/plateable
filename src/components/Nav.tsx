import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { LinkContainer} from 'react-router-bootstrap';

type NavBarProps = {
  logout: () => void
}

const NavBar = (props:NavBarProps) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Plateable</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav  className="me-auto">
            <LinkContainer to="/pantry">
              <Nav.Link>Pantry List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/grocery">
              <Nav.Link>Grocery List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recipes">
              <Nav.Link>Recipe Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/saved">
              <Nav.Link>Saved</Nav.Link>
            </LinkContainer>
          </Nav>

          <Button variant="outline-light" onClick={props.logout}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default NavBar;