import React from "react";
import { Row, Col } from "react-bootstrap";

// Styles
import '../Styles/dist/LoginScreen.css'

// Components
import Header from "../Components/Header";
import LoginForm from "../Components/LoginForm";

function LoginScreen(){
    const title = "Rip Core";
    return(
        <div>
            <header>
                <Header title={title} />
            </header>
            <br/>
            <div id="login-container">
                <Row>
                    <Col>
                        <LoginForm />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default LoginScreen;