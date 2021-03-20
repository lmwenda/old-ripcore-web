import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Report from "./Report";
import { History } from "../Global/history";

// Styles
import '../Styles/dist/Signup.css';

function SignupForm(){
    

    // States

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Device Width Variables
    const wideScreen = window.matchMedia('(min-width: 1920px)');
    const laptopView = window.matchMedia('(max-width: 1024px)');
    const phoneView = window.matchMedia('(max-width: 600px)');

    function CreateAccount(){
        if(email !== "" && username !== "" && password !== ""){
            
            // New User Object
            const newUser = {
                email, 
                username,
                password
            }

            // Registering new User to localStorage
            const user = localStorage.setItem("User", JSON.stringify(newUser));
            axios.post('http://localhost:5000/api/users/register', {
                email: email,
                username: username,
                password: password
            });
            
            // Logging and Pushing to Index Route
            console.log("Registered");
            History.push('/login');
        } else{
            console.error("Error on your form. Please fill in the current fields.");
            Report("Whoops! There was an mistake in your Form!");
        }
    }

    if(wideScreen){
        return(
            <div className="container" style={{marginLeft: '22.5%'}}>
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
    } if(laptopView){
        return(
            <div className="container" style={{marginLeft: '50%'}}>
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
    }if(phoneView){
        return(
            <div id="wrapper" style={{ marginRight: '500px' }}>
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
}

export default SignupForm;