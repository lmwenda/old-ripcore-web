import React from "react";
import { Row, Col } from "react-bootstrap";

// Styles
import '../Styles/dist/SignupScreen.css';

// Components
import Header from "../Components/Header";
import SignupForm from "../Components/SignupForm";

function SignupScreen(){
    const title = "Beat the Elite";
    return(
        <div>
            <header>
                <Header title={title} />
            </header>
            <br/>
            <div id="signup-container">
                <Row>
                    <Col>
                        <SignupForm />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default SignupScreen;