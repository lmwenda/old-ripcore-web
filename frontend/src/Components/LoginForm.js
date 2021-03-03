import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Styles
import '../Styles/dist/LoginForm.css';

function LoginForm(){
    return(
        <div className="container">
            <br />
            <h1>Login to Elite!</h1>
            <hr id="liner" />
            <br />
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control id="top-input" type="email" placeholder="Enter Your Email:" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="input" type="password" placeholder="Enter Your Password: " />
                </Form.Group>
                <button id="login-button">Login</button>
                <Form.Text id="label" className="text-muted">
                    Haven't created an Account? <Link to="/signup">Signup here</Link>
                </Form.Text>
            </Form>
        </div>
    );
}

export default LoginForm;