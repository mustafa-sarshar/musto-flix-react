// Import Libs
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import dateFormat from "../../../utils/dateFormat";

// Import Styles
import "./userInfoView.scss";

// Import Bootstrap Components
import { Form, Button, Modal, Row, Col, Card } from "react-bootstrap";

// Debugger
const DEBUG = Boolean(process.env.DEBUG_MY_APP) || false;

const UserInfoView = (props) => {
  const { username, email, birth } = props.userData;

  // Declare hook for each input
  const [usernameUpdate, setUsernameUpdate] = useState();
  const [passwordUpdate, setPasswordUpdate] = useState();
  const [emailUpdate, setEmailUpdate] = useState();
  const [birthUpdate, setBirthUpdate] = useState();

  // Declare hook for each error
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
    const usernamePattern = /^[a-z0-9]+$/i;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const datePattern = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
    let isReq = true;

    // Reset Error Messages
    resetErrorMessages();

    if (usernameUpdate) {
      if (usernameUpdate.length < 5) {
        setUsernameErr("Username must be at least 5 characters long");
        isReq = false;
      } else if (!usernamePattern.test(usernameUpdate)) {
        setUsernameErr("Username can contain only alphanumeric characters");
        isReq = false;
      }
    }

    if (emailUpdate && !emailPattern.test(emailUpdate)) {
      setEmailErr("Email Address Not Valid");
      isReq = false;
    }

    if (passwordUpdate && passwordUpdate.length < 5) {
      setPasswordErr("Password must be at least 5 characters long");
      isReq = false;
    }

    if (birthUpdate && !datePattern.test(dateFormat(birthUpdate))) {
      setBirthErr("Birth Date Not Valid");
      isReq = false;
    }

    if (!usernameUpdate && !passwordUpdate && !emailUpdate && !birthUpdate) {
      setUpdateErr("No data is given");
      isReq = false;
    }

    console.log(usernameUpdate, passwordUpdate, emailUpdate, birthUpdate);
    return isReq;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (DEBUG)
      console.log(usernameUpdate, passwordUpdate, emailUpdate, birthUpdate);

    const isReq = validate();
    const token = localStorage.getItem("token");
    if (isReq && token && username) {
      setIsFetching(true);

      const userUpdate = {};
      if (usernameUpdate) userUpdate.username = usernameUpdate;
      if (passwordUpdate) userUpdate.pass = passwordUpdate;
      if (emailUpdate) userUpdate.email = emailUpdate;
      if (birthUpdate) userUpdate.birth = birthUpdate;

      console.log("UserUpdate:", userUpdate);

      const reqInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });
      reqInstance
        .put(
          `https://musto-movie-api.onrender.com/users/${username}`,
          userUpdate
        )
        .then((response) => {
          const data = response.data;
          if (DEBUG) console.log(data);
          alert(`The user data is successfully updated`);
          if (usernameUpdate) {
            localStorage.setItem("user", usernameUpdate);
            window.open("/user-update", "_self");
          } else {
            window.open(`/users/${username}`, "_self");
          }
          resetUpdateHooks();
          resetErrorMessages();
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

  const resetErrorMessages = () => {
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    setBirthErr("");
    setUpdateErr("");
  };

  const resetUpdateHooks = () => {
    setUsernameUpdate("");
    setPasswordUpdate("");
    setBirthUpdate();
    setEmailUpdate("");
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
      <Row>
        <Col xl={4}>
          <Card className="movie-card mb-3">
            <Card.Body>
              <Form autoComplete="on">
                <Form.Group className="mb-3" controlId="formEmailInfo">
                  <Form.Label>Email</Form.Label>
                  <Form.Text className="user-info__item">{email}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthDateInfo">
                  <Form.Label>Birth date</Form.Label>
                  <Form.Text className="user-info__item">
                    {birth ? dateFormat(birth, "toLocaleDateString") : "NA"}
                  </Form.Text>
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formButtonSubmit">
                  <Button
                    variant="danger"
                    type="button"
                    disabled={isFetching}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8}>
          <Card className="movie-card h-100 w-100">
            <Card.Body>
              <Form autoComplete="on">
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={isFetching}
                    autoComplete="off"
                    new-password="true"
                    onChange={(e) => setUsernameUpdate(e.target.value)}
                  />

                  {usernameErr && (
                    <Form.Text className="user-info-form__error">
                      {usernameErr}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    disabled={isFetching}
                    autoComplete="off"
                    onChange={(e) => setEmailUpdate(e.target.value)}
                  />

                  {emailErr && (
                    <Form.Text className="user-info-form__error">
                      {emailErr}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    autoComplete="on"
                    disabled={isFetching}
                    new-password="true"
                    onChange={(e) => setPasswordUpdate(e.target.value)}
                  />

                  {passwordErr && (
                    <Form.Text className="user-info-form__error">
                      {passwordErr}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthDate">
                  <Form.Label>Birth date</Form.Label>
                  <Form.Control
                    type="date"
                    disabled={isFetching}
                    autoComplete="off"
                    onChange={(e) => setBirthUpdate(dateFormat(e.target.value))}
                  />

                  {birthErr && (
                    <Form.Text className="user-info-form__error">
                      {birthErr}
                    </Form.Text>
                  )}
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
                </Form.Group>

                {updateErr && (
                  <Form.Text className="user-info-form__error">
                    {updateErr}
                  </Form.Text>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <br />
      <br />
    </>
  );
};

UserInfoView.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserInfoView;
