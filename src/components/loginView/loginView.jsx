// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Import Styles
import "./loginView.scss";

// Import Bootstrap Components
import { Button, Form } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loginErr, setLoginErr] = useState("");

  // Control the elements
  const [isFetching, setIsFetching] = useState(false);

  // validate user inputs
  const validate = () => {
    const usernamePattern = /^[a-z0-9]+$/i;
    let isReq = true;

    // Reset Errors
    setUsernameErr("");
    setPasswordErr("");
    setLoginErr("");

    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
      isReq = false;
    } else if (!usernamePattern.test(username)) {
      setUsernameErr("Username can contain only alphanumeric characters");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be at least 5 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("username:", username, "password:", password);

    const isReq = validate();
    if (isReq) {
      setIsFetching(true);
      /* Send a request to the server for authentication */
      axios
        .post("https://musto-movie-api.onrender.com/login", null, {
          params: {
            username: username,
            pass: password,
          },
        })
        .then((response) => {
          const authData = response.data;
          props.onLoggedIn({ ...authData });
        })
        .catch((err) => {
          console.error(err.message);
          setLoginErr(err.response.data.message);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  return (
    <>
      <h1 className="login-title">Login 😊</h1>
      <Form autoComplete="on">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            value={username}
            disabled={isFetching}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
          {/* Validation error */}
          {usernameErr && (
            <p className="login-form__error">{usernameErr}</p>
          )}{" "}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            autoComplete="on"
            value={password}
            disabled={isFetching}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
          {/* Validation error */}
          {passwordErr && <p className="login-form__error">{passwordErr}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formButtonSubmit">
          <Button
            variant="primary"
            type="submit"
            disabled={isFetching}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form.Group>
        {/* Registration error */}
        {loginErr && <p className="login-form__error">{loginErr}</p>}
      </Form>
    </>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default LoginView;
