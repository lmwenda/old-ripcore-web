import React from "react";
import { Row, Col } from "react-bootstrap";

// Styles
import "../Styles/dist/HomeScreen.css";

// Components
import Header from "../Components/Header";

function HomeScreen() {
  const title = "Rip Core";
  return (
    <div>
      <header>
        <Header title={title} />
      </header>
      <br />
      <div style={{ backgroundColor: "#fff" }} className="wrapper">
        <Row>
          <Col id="const">
            <h1 id="title" style={{ textAlign: "center" }}>
              RIP CORE!
            </h1>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
