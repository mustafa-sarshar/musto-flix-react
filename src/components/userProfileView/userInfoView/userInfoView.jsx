// Import Libs
import React, { useState } from "react";
import axios from "axios";
import dateFormat from "../../../utils/dateFormat";

// Import Styles
import "./userInfoView.scss";

// Import Bootstrap Components
import { Form, Button, Modal } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

function UserInfoView(props) {
  const [username, setUsername] = useState(props.user.username);
  const [password, setPassword] = useState(props.user.password);
  const [email, setEmail] = useState(props.user.email);
  const [birth, setBirth] = useState(props.user.birth);

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthErr, setBirthErr] = useState();
  const [updateErr, setUpdateErr] = useState("");

  // Control the elements
  const [isFetching, setIsFetching] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // validate user inputs
  const validate = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const datePattern = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    let isReq = true;

    // Reset Errors
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    setBirthErr("");
    setUpdateErr("");

    if (username && username.length < 2) {
      setUsernameErr("Username must be at least 2 characters long");
      isReq = false;
    }

    if (email && !emailPattern.test(email)) {
      setEmailErr("Email Address Not Valid");
      isReq = false;
    }

    if (password && password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }

    if (birth && !datePattern.test(dateFormat(birth))) {
      console.log(birth);
      setBirthErr("Birth Date Not Valid");
      isReq = false;
    }

    console.log(username, password, email, dateFormat(birth));
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

    const isReq = validate();
    const token = localStorage.getItem("token");
    if (isReq && token && username) {
      setIsFetching(true);

      const reqInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });
      reqInstance
        .put(`https://musto-movie-api.onrender.com/users/${username}`, {
          username: username,
          email: email,
          pass: password,
          birth: birth,
        })
        .then((response) => {
          const data = response.data;
          if (DEBUG) console.log(data);
          alert(`The username '${username}' is successfully updated`);
          // window.open("/", "_self");
        })
        .catch((err) => {
          alert("Unable to update, please try again.");
          console.error("Error in updating:\n", err);
          setUpdateErr(err.response.data.message);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  const handleDeleteUser = (evt) => {
    const token = localStorage.getItem("token");

    if (username && token) {
      setIsFetching(true);

      const reqInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });
      reqInstance
        .delete(`https://musto-movie-api.onrender.com/users/${username}`)
        .then((response) => {
          const data = response.data;
          if (DEBUG) console.log(data);
          alert(`The username '${username}' is successfully deleted`);
          window.open("/logout", "_self");
        })
        .catch((err) => {
          alert("Unable to delete, please try again.");
          console.error("Error in deleting:\n", err);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  const handleCancelDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleYesDeleteModal = () => {
    handleDeleteUser();
    setShowDeleteModal(false);
  };

  return (
    <>
      <Modal show={showDeleteModal} onHide={handleCancelDeleteModal}>
        <Modal.Header>
          <Modal.Title className="alert alert-danger">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Are you sure, to delete the account for the user with username:
          {" >" + username + "<"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleYesDeleteModal}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
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
            <p className="user-info-form__error">{usernameErr}</p>
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
          {/* Validation error */}
          {emailErr && <p className="user-info-form__error">{emailErr}</p>}
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
          {/* Validation error */}
          {passwordErr && (
            <p className="user-info-form__error">{passwordErr}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthDate">
          <Form.Label>Birth date</Form.Label>
          <Form.Control
            type="date"
            placeholder="dd-mm-yyyy"
            value={dateFormat(birth)}
            disabled={isFetching}
            onChange={(e) => setBirth(dateFormat(e.target.value))}
          />
          <Form.Text className="text-muted">**optional</Form.Text>
          {/* Validation error */}
          {birthErr && <p className="user-info-form__error">{birthErr}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formButtonSubmit">
          <Button
            variant="primary"
            type="submit"
            disabled={isFetching}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            variant="danger"
            type="button"
            disabled={isFetching}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </Button>
        </Form.Group>

        {/* Update error */}
        {updateErr && <p className="user-info-form__error">{updateErr}</p>}
      </Form>
      <br />
      <br />
    </>
  );
}

export default UserInfoView;
