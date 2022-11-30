// Import Bootstrap Components
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

// Import Custom Styles
import "./myNavBar.scss";

function MyNavBar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={props.onGotoMainView}>
          Musto myFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link onClick={props.onSignUpClick}>Sign Up</Nav.Link>
            <NavDropdown
              title={props.user ? "Signed in as: " + props.user : ""}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#action/3.1"
                disabled={props.user ? false : true}
                onClick={props.onProfileClick}
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.2"
                disabled={props.user ? false : true}
                onClick={props.onLoggedOutClick}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
