// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";

// Import Styles
import "./registrationView.scss";

// Import Bootstrap Components
import { Form, Button } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG)
      console.log(
        "username:",
        username,
        "password:",
        password,
        "email:",
        email,
        "birth:",
        birth,
      );
    /* Send a request to the server for authentication */
    /* then call props.onSignedIn(username) */
    props.onSignedIn();
  };
  return (
    <>
      <h1 className="registration-title">
        Please register yourself, if you still don't have any accounts 👌
      </h1>
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

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@mail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            *required (We'll never share your email with anyone else.)
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            placeholder="birth date"
            onChange={(e) => setBirth(e.target.value)}
          />
          <Form.Text className="text-muted">**optional</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
      <br />
      <br />
    </>
  );
}

RegistrationView.propTypes = {
  onSignedIn: PropTypes.func.isRequired,
};

export default RegistrationView;
