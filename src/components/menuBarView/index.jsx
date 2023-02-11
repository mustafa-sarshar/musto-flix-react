// Import Libs
import React from "react";
import PropTypes from "prop-types";

// Import Custom Styles
import "./styles.scss";

// Import Bootstrap Components
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MenuBarView = ({ user }) => {
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      fixed="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo">
          <Link to="/">
            <span className="navbar-brand">Musto Flix</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Link to={`/users/${user}`}>
                <Button variant="link-outlined text-secondary">
                  Signed in as: <span className="navbar__username">{user}</span>{" "}
                </Button>
              </Link>
            )}
            {isAuth() && (
              <Link to="/logout">
                <Button variant="link-outlined text-secondary">Logout</Button>
              </Link>
            )}
            {!isAuth() && (
              <Link to="/">
                <Button variant="link-outlined text-secondary">Sign In</Button>
              </Link>
            )}
            {!isAuth() && (
              <Link to="/register">
                <Button variant="link-outlined text-secondary">Sign Up</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

MenuBarView.propTypes = {
  user: PropTypes.string.isRequired,
};

export default MenuBarView;
