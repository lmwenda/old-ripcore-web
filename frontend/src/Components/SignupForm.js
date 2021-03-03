import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Styles
import '../Styles/dist/LoginForm.css';

function SignupForm(){
    const email = useRef();
    const username = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    return(
        <div className="container">
            
            <br />

            <h1>Create an Account!</h1>

            <hr id="liner" />
            <br />

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control id="top-input" type="email" placeholder="Enter Your Email:" />
                </Form.Group>

                <Form.Group>
                    <Form.Control id="input" type="text" placeholder="Enter your Username: " />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="input" type="password" placeholder="Enter Your Password: " />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="input" type="password" placeholder="Confirm Your Password: " />
                </Form.Group>

                <button id="login-button">Create an Account</button>
                <Form.Text id="label" className="text-muted">
                    Already have an Account? <Link to="/login">Login here</Link>
                </Form.Text>
            </Form>
        </div>
    );
}

export default SignupForm;