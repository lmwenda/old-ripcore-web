import React, { useState } from "react";
import axios from "axios";
import { Form, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Validation from "./Validation";
import { History } from "../Global/history";

// Styles
import '../Styles/dist/Signup.css';

function SignupForm(){

    // States

    const [emailReg, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [usernameReg, setUsername] = useState("");
    const [passwordReg, setPassword] = useState("");

    // Device Width Variables
    const wideScreen = window.matchMedia('(min-width: 1920px)');
    const laptopView = window.matchMedia('(max-width: 1024px)');
    const phoneView = window.matchMedia('(max-width: 600px)');

    async function CreateAccount(e){
        e.preventDefault();
        // Registering new User to the Database
        axios.post('http://localhost:5000/api/users/register', {
            email: emailReg,
            username: usernameReg,
            password: passwordReg,
            membership: 'Free'
        })
        .then(response => {
            console.log(response);
            // Logging and Pushing to Index Route
            console.log("Registered");
            History.push('/login');
        })
        .catch(async(err) => {
            setErrorMsg(err.request.response);
            console.log(err.request.response);
            await new Promise(resolve => setTimeout(resolve, 3000));
        });        
    }

    if(wideScreen){
        return(
            <div className="container" style={{marginLeft: '22.5%'}}>
                <Form id="form" onSubmit={CreateAccount}>
                    <h1 id="title">Create an Account!</h1>
                    <hr id="liner" />
                    <br />

                    <div className="validation-errors">
                    {
                        errorMsg !== "" ? (
                            <Validation error={errorMsg} />
                        ) : null
                    }
                    </div>

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

                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>Membership: Free Tier</Card.Body>
                                </Accordion.Collapse>
                            </Card.Header>
                        </Card>
                    </Accordion>

                    <button id="login-button" onClick={CreateAccount}>
                        Create an Account
                    </button>

                    <Form.Text id="label" className="text-muted">
                        Already have an Account? <Link to="/login">Login here</Link>
                    </Form.Text>
                </Form>
            </div>
        ); 
    } if(laptopView){
        return(
            <div className="container" style={{marginLeft: '50%'}}>
                <Form id="form" onSubmit={CreateAccount}>
                    <h1 id="title">Create an Account!</h1>
                    <hr id="liner" />
                    <br />

                    <div className="validation-errors">
                    {
                        errorMsg !== "" ? (
                            <Validation error={errorMsg} />
                        ) : null
                    }
                    </div>

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

                    <button id="login-button" onClick={CreateAccount}>Create an Account</button>
                    <Form.Text id="label" className="text-muted">
                        Already have an Account? <Link to="/login">Login here</Link>
                    </Form.Text>
                </Form>
            </div>
        );
    }if(phoneView){
        return(
            <div id="wrapper" style={{ marginRight: '500px' }}>
                <Form id="form" onSubmit={CreateAccount}>
                    <h1 id="title">Create an Account!</h1>
                    <hr id="liner" />
                    <br />

                    <div className="validation-errors">
                    {
                        errorMsg !== "" ? (
                            <Validation error={errorMsg} />
                        ) : null
                    }
                    </div>

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

                    <button id="login-button" onClick={CreateAccount}>Create an Account</button>
                    <Form.Text id="label" className="text-muted">
                        Already have an Account? <Link to="/login">Login here</Link>
                    </Form.Text>
                </Form>
            </div>            
        );
    }
}

export default SignupForm;