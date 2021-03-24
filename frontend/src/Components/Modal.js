import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Show(props, { cause, title, firstButton, secondButton }) {
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
        <Button variant="secondary" onClick={handleShow}>
          {cause}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {secondButton}
            </Button>
            <Button variant="danger" onClick={DeleteAccount}>
              {firstButton}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default Show;
  