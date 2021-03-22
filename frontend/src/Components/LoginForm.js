import React, { useState } from "react";
import Axios from "axios";
import { Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Welcome from "./Welcome";
import Validation from "./Validation";
// import { History } from "../Global/history";

// Styles
import "../Styles/dist/LoginForm.css";

function LoginForm({ history }) {
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
        localStorage.setItem("token", response.headers["verification-token"]);
        console.log(localStorage.getItem("token"));
        setWelcomeMsg(`${response.request.responseText}!`);
        window.location.reload();
      })
      .catch(async (err) => {
        if (err) {
          //   setErrorMsg(err.request.response);
          //   await new Promise((resolve) => setTimeout(resolve, 3000));
          //   setErrorMsg("");
          console.log(err);
        } else {
          return;
        }
      });
  }

  return (
    <div className="container">
      <Form id="form" style={{ marginLeft: "220px" }} onSubmit={Login}>
        <h1 id="title">Login to Elite!</h1>
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
