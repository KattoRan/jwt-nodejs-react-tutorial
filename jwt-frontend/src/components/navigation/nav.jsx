import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

const NavComponent = () => {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to=".">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="features">
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="pricing">
              Pricing
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default NavComponent;
