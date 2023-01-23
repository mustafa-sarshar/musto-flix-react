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
        <Navbar.Brand className="navbar-logo" href="/">
          Musto Flix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>
                Signed in as: <span className="navbar__username">{user}</span>{" "}
              </Nav.Link>
            )}
            {isAuth() && (
              <Link to={"/logout"}>
                <Button variant="link">Logout</Button>
              </Link>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
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
