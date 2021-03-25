import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Validation from "./Validation";

// Styles
import '../Styles/dist/Signup.css';
import Welcome from "./Welcome";

function SignupForm(props){

    // States

    const [emailReg, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [usernameReg, setUsername] = useState("");
    const [passwordReg, setPassword] = useState("");
    const [welcomeMsgReg, setWelcomeMsgReg ] = useState("");

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
            membership: 'Free',
            isAdmin: false,

        })
        .then(response => {
            const id = response.data._id;
            console.log(id);
            localStorage.setItem("_id", id);

            console.log(response);
            setWelcomeMsgReg("Successfully Created an Account.");

            // Logging and Pushing to Index Route

            console.log("Registered");
            props.history.push('/login');

        })
        .catch(async(err) => {
            try{
                setErrorMsg(err.request.response);
                console.log(err.request.response);

                await new Promise(resolve => setTimeout(resolve, 3000));
                setErrorMsg("");
            } catch(e){
                console.error(e);
                return e;
            }
        });        
    }

    if(wideScreen){
        return(
            <div className="container" style={{color: '#000'}}>
                <Form id="form" onSubmit={CreateAccount}>
                    <h1 id="title" style={{color: '#000'}}>Create an Account!</h1>
                    <hr id="liner" style={{background: '#000'}} />

                    <div className="validation-successful">
                        {
                            welcomeMsgReg !== "" ? (
                                <Welcome message={welcomeMsgReg}
                                path="/login" />
                            ) : null
                        }
                    </div>

                    <div className="validation-errors">
                        {
                            errorMsg !== "" ? (
                                <Validation error={errorMsg} path={'/signup'} />
                            ) : null
                        }
                    </div>

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

                    <div className="membership">
                        Membership: Free Tier
                    </div>

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

                    <div className="validation-errors">
                        {
                            errorMsg !== "" ? (
                                <Validation error={errorMsg} path={'/signup'} />
                            ) : null
                        }
                    </div>

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

                    <div className="membership">
                        Membership: Free Tier
                    </div>

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

                    <div className="validation-errors">
                        {
                            errorMsg !== "" ? (
                                <Validation error={errorMsg} path={'/signup'} />
                            ) : null
                        }
                    </div>

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

                    <div className="membership">
                        Membership: Free Tier
                    </div>

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