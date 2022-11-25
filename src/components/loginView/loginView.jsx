// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";

// Import Styles
import "./loginView.scss";

// Import Bootstrap Components
import { Button, Form } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("username:", username, "password:", password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };
  const handleRequestRegister = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("Sign In Request");
    /* Send a request to the server for registration */
    props.onRequestRegister();
  };
  return (
    <>
      <h1 className="login-title">Please Log In To Enjoy It 😊</h1>
      <hr />
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            autoComplete="true"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formButtonSubmit">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formButtonRegister">
          <Button
            variant="secondary"
            type="button"
            onClick={handleRequestRegister}
          >
            Register
          </Button>
          <Form.Text className="text-muted">
            Please register yourself, if you still don't have any accounts
          </Form.Text>
        </Form.Group>
      </Form>
    </>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
