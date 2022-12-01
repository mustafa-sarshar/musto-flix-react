// Import Libs
import React, { useState } from "react";

// Import Styles
import "./modalView.scss";

// Import Bootstrap Components
import { Button, Modal } from "react-bootstrap";

const UserDeleteModalView = (props) => {
  const [show, setShow] = useState(false);
  const { username, onCancelClick, onYesClick, showDeleteModal } = props;

  const handleCancel = () => {
    console.log("Cancel");
    setShow(false);
  };
  const handleYes = () => {
    console.log("Yes");
    setShow(false);
  };
  const handleShow = (props) => {
    console.log("Show modal");
    setShow(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={showDeleteModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, to delete the account for the user with username:{" "}
          {username}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { UserDeleteModalView };
