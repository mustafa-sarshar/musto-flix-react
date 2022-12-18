// Import Libs
import React from "react";

// Import Custom Styles
import "./footerView.scss";

// Import Bootstrap Components
import { Navbar, Container, Nav } from "react-bootstrap";

const FooterView = ({ user }) => {
  return (
    <Navbar className="main-nav" fixed="bottom" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          className="navbar-logo text-center"
          href="/"
        ></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Navbar.Text>Designed and Developed by:</Navbar.Text>
            <Nav.Link
              href="https://mustafa-sarshar.github.io/portfolio-website/"
              target="_blank"
            >
              Musto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FooterView;
