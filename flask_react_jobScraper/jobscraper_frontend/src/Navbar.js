import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function CustomNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <a href="/" className="navbar-brand">Job Finder</a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <a href="/features" className="nav-link">Features</a>
            <a href="/pricing" className="nav-link">About Us</a>
            <NavDropdown title="References" id="collapsible-nav-dropdown">
              <a href="/action/3.1" className="dropdown-item">Action</a>
              <a href="/action/3.2" className="dropdown-item">Another action</a>
              <a href="/action/3.3" className="dropdown-item">Something</a>
              <NavDropdown.Divider />
              <a href="/action/3.4" className="dropdown-item">Separated link</a>
            </NavDropdown>
          </Nav>
          <a href="/login" className="nav-link custom-button">
            Login
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
