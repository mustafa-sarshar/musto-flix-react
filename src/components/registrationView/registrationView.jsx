// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthErr, setBirthErr] = useState();
  const [registrationErr, setRegistrationErr] = useState("");

  // Control the elements
  const [isFetching, setIsFetching] = useState(false);

  // validate user inputs
  const validate = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const dateFormat = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    let isReq = true;

    // Reset Errors
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    setBirthErr("");
    setRegistrationErr("");

    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email Required");
      isReq = false;
    } else if (!emailPattern.test(email)) {
      setEmailErr("Email Address Not Valid");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    if (birth && !dateFormat.test(birth)) {
      setBirthErr("Birth Date Not Valid");
      isReq = false;
    }

    return isReq;
  };

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
        birth
      );
    /* Send a request to the server for authentication */
    /* then call props.onSignedIn(username) */

    const isReq = validate();
    if (isReq) {
      setIsFetching(true);
      /* Send a request to the server for authentication */
      axios
        .post(
          "https://musto-movie-api.onrender.com/users",
          { username: username, pass: password, email: email, birth: birth },
          null
        )
        .then((response) => {
          const data = response.data;
          if (DEBUG) console.log(data);
          alert(`The username '${username}' is successfully registered`);
          window.open("/", "_self");
        })
        .catch((err) => {
          alert("Unable to register, please try again.");
          console.error(err.message);
          setRegistrationErr(err.message);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  return (
    <>
      <h1 className="registration-title">Registration Form 👌</h1>
      <hr />
      <hr />
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
          {/* code added here to display validation error */}
          {usernameErr && (
            <p className="registration-form__error">{usernameErr}</p>
          )}{" "}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@mail.com"
            value={email}
            disabled={isFetching}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            *required (We'll never share your email with anyone else.)
          </Form.Text>
          {/* code added here to display validation error */}
          {emailErr && <p className="registration-form__error">{emailErr}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            autoComplete="on"
            disabled={isFetching}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">*required</Form.Text>
          {/* code added here to display validation error */}
          {passwordErr && (
            <p className="registration-form__error">{passwordErr}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBirthDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            placeholder="birth date"
            value={birth}
            disabled={isFetching}
            onChange={(e) => setBirth(e.target.value)}
          />
          <Form.Text className="text-muted">**optional</Form.Text>
          {/* code added here to display validation error */}
          {birthErr && <p className="registration-form__error">{birthErr}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formButtonSubmit">
          <Button
            variant="primary"
            type="submit"
            disabled={isFetching}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form.Group>
        {/* Registration error */}
        {registrationErr && (
          <p className="registration-form__error">{registrationErr}</p>
        )}
      </Form>
      <br />
      <br />
    </>
  );
}

export default RegistrationView;
