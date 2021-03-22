import React from "react";
import Packupload from "../Components/Packupload";
import Header from "../Components/Header";
import { Row, Col } from "react-bootstrap";

function PackUpload() {
  const title = "RIP Core";
  return (
    <div>
      <header>
        <Header title={title} />
      </header>
      <br />
      <div>
        <Row>
          <Col>
            <Packupload />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PackUpload;
