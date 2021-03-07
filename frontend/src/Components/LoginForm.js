import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Axios from "axios";
import { History } from "../Global/history";

// Styles
import '../Styles/dist/LoginForm.css';

function LoginForm(){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function Login(){
        Axios.post('http://localhost:5000/api/users/login', {
            email: email,
            password: password
        });
        History.push('/');
        console.log("Successfully Logged in", email);
    }

    return(
        <div className="container">
            <br />
            <h1>Login to Elite!</h1>
            <hr id="liner" />
            <br />
            <Form onSubmit={Login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control id="top-input" type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email:" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="input" type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password: " />
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