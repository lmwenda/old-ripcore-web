import React, { useState } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import Welcome from "./Welcome";
import Validation from "./Validation";

// Styles
import "../Styles/dist/LoginForm.css";

function LoginForm() {
  // localStorage
  const id = localStorage.getItem('_id');

  // States

  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");

  async function Login(e) {
    e.preventDefault();

    Axios.post("http://localhost:5000/api/users/login", {

      email: email,
      password: password,
      
    })
      .then(async (response) => {
        console.log(response);

        localStorage.setItem("token", response.headers["verification-token"]);
        console.log(localStorage.getItem("token"));

        if(!id){
          localStorage.setItem('_id', response.headers["user-id"]);
        }

        setWelcomeMsg(`${response.request.responseText}! Please Refresh your Page.`);

      })
      .catch(async (err) => {
        try{
          if (err) {

            setErrorMsg(err.request.response);
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setErrorMsg("");

          } else {
            return false;
          }
        }catch(err){
          console.log(err);
        }
      });
  }

  return (
    <div className="container">
      <Form id="form" style={{ marginLeft: "220px" }} onSubmit={Login}>
        <h1 id="title">Login to Rip Core!</h1>
        <hr id="liner" />

        <div className="validation-pass">
          {welcomeMsg !== "" ? (
            <Welcome message={welcomeMsg} path={"/"} />
          ) : null}
        </div>

        <div className="validation-errors">
          {errorMsg !== "" ? (
            <Validation error={errorMsg} path={"/login"} />
          ) : null}
        </div>

        <br />
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            id="top-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email:"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            id="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password: "
          />
        </Form.Group>
        <button id="login-button">Login</button>
        <Form.Text id="label" className="text-muted">
          Don't have an account? <Link to="/signup">Create one here.</Link>
        </Form.Text>
      </Form>
    </div>
  );
}

export default LoginForm;
