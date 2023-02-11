// Import Libs
import React from "react";
import PropTypes from "prop-types";

// Import Custom Styles
import "./styles.scss";

// Import Bootstrap Components
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Configs
import { APP_MODE, APP_ADDRESS } from "../../config";

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
          <Link to={APP_MODE === "prod" ? APP_ADDRESS : "/"}>
            <span className="navbar-brand">Musto Flix</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Link
                to={
                  APP_MODE === "prod"
                    ? `${APP_ADDRESS}/users/${user}`
                    : `/users/${user}`
                }
              >
                <Button variant="link-outlined text-secondary">
                  Signed in as: <span className="navbar__username">{user}</span>{" "}
                </Button>
              </Link>
            )}
            {isAuth() && (
              <Link
                to={APP_MODE === "prod" ? `${APP_ADDRESS}/logout` : "/logout"}
              >
                <Button variant="link-outlined text-secondary">Logout</Button>
              </Link>
            )}
            {!isAuth() && (
              <Link to={APP_MODE === "prod" ? APP_ADDRESS : "/"}>
                <Button variant="link-outlined text-secondary">Sign In</Button>
              </Link>
            )}
            {!isAuth() && (
              <Link
                to={
                  APP_MODE === "prod" ? `${APP_ADDRESS}/register` : "/register"
                }
              >
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
