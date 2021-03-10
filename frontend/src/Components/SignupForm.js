import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Axios from "axios";
import { History } from "../Global/history";

// Styles
import '../Styles/dist/Signup.css';

function SignupForm(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function CreateAccount(){
        Axios.post('http://localhost:5000/api/users/register', {
            email: email,
            username: username,
            password: password
        });
        console.log("Registered");
        History.push('/');
    }

    return(
        <div className="container">
            <Form id="form" onSubmit={CreateAccount}>
                <h1 id="title">Create an Account!</h1>
                <hr id="liner" />
                <br />

                <Form.Group controlId="formBasicEmail">
                    <Form.Control id="top-input" type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email:" />
                </Form.Group>

                <Form.Group>
                    <Form.Control id="input" type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your Username: " />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control id="input" type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password: " />
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