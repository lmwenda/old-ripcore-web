import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Show(props, { title, firstButton, secondButton }) {
    const _id = localStorage.getItem("_id");

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const DeleteAccount = () => {
      axios.delete(`http://localhost:5000/api/users/delete/user/${_id}`);

      // Removing Local Storage Items

      localStorage.removeItem("_id");
      localStorage.removeItem("token");

      // Closing the Modal
  
      setShow(false);

      // Redirecting the User

      return ( <Redirect to={{
        pathname: '/login',
        state: {
          from: props.location
        }
      }} /> )
    }
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          Delete Account
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete your Account?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={DeleteAccount}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Show;
  