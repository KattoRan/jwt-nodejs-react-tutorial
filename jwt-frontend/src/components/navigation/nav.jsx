import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./nav.css";

const NavComponent = () => {
  const location = useLocation(); // Dùng để lấy location hiện tại

  return (
    <div className="ps-5 pe-5">
      <Navbar bg="light" data-bs-theme="light">
        {/* Navbar Brand */}
        <Navbar.Brand as={Link} to="/" className="fs-4"></Navbar.Brand>
        {/* Nav Links */}
        <Nav className="me-auto">
          {/* Home Link */}
          <Nav.Link
            as={Link}
            to="home"
            className={location.pathname === "/home" ? "active" : ""}
          >
            Home
          </Nav.Link>

          {/* User Link */}
          <Nav.Link
            as={Link}
            to="user-manager"
            className={location.pathname === "/user-manager" ? "active" : ""}
          >
            User
          </Nav.Link>

          {/* Features Link */}
          <Nav.Link
            as={Link}
            to="features"
            className={location.pathname === "/features" ? "active" : ""}
          >
            Features
          </Nav.Link>

          {/* Pricing Link */}
          <Nav.Link
            as={Link}
            to="pricing"
            className={location.pathname === "/pricing" ? "active" : ""}
          >
            Pricing
          </Nav.Link>
        </Nav>
      </Navbar>
      {/* Render content */}
      <Outlet />
    </div>
  );
};

export default NavComponent;
