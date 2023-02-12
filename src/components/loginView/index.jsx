// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import notifier from "../../utils/notifiers";

// Import Styles
import "./styles.scss";

// Import Bootstrap Components
import { Button, Form } from "react-bootstrap";

// Configs
import { SERVER_ADDRESS, APP_MODE, APP_ADDRESS } from "../../config";
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
      notifier.notifyWarn("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
      notifier.notifyError("Username must be at least 5 characters long");
      isReq = false;
    } else if (!usernamePattern.test(username)) {
      setUsernameErr("Username can contain only alphanumeric characters");
      notifier.notifyError("Username can contain only alphanumeric characters");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      notifier.notifyWarn("Password Required");
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr("Password must be at least 5 characters long");
      notifier.notifyError("Password must be at least 5 characters long");
      isReq = false;
    }

    return isReq;
  };

  const getUserData = (username, password) => {
    axios
      .post(`${SERVER_ADDRESS}/login`, null, {
        params: {
          username: username,
          pass: password,
        },
      })
      .then((response) => {
        const authData = response.data;
        notifier.notifySuccess(`Welcome ${username}`, {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            props.onLoggedIn({ ...authData });
            window.open(APP_MODE === "prod" ? `${APP_ADDRESS}/` : "/", "_self");
          },
        });
      })
      .catch((err) => {
        if (err.response?.data) {
          console.error("Error in login:\n", err.response.data);
          setLoginErr(err.response.data.message);
          notifier.notifyError(err.response.data.message);
        } else {
          console.error("Error in login:\n", err.message);
          setLoginErr(err.message);
          notifier.notifyError(err.message);
        }
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG) console.log("username:", username, "password:", password);

    const isReq = validate();
    if (isReq) {
      setIsFetching(true);
      getUserData(username, password);
    }
  };

  return (
    <>
      <h1 className="login-title">Sign In 😊</h1>
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
