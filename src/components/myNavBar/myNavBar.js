// Import Bootstrap Components
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

// Import Custom Styles
import "./myNavBar.scss";

function MyNavBar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Musto myFlix App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <NavDropdown
              className="float-right"
              title={props.user ? props.user : "User"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#action/3.1"
                disabled={props.user ? true : false}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={props.onSignUpClick}
              >
                Sign Up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.3"
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
