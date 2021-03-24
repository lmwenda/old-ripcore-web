import React from "react";
import PackUpload from "../Components/PackUpload";
import Header from "../Components/Header";
import { Row, Col } from "react-bootstrap";

import '../Styles/dist/PackScreen.css';
import { Link } from "react-router-dom";

function PackScreen() {

  const title = "RIP Core";

  return (
    <div className="packscreen">

      <header>
        <Header title={title} />
      </header>
      
      <br />

      <div className="packscreen_upload">
        <Row>
          <Col>
            <h1>File Upload</h1>
            <PackUpload />
            <Link to="/admin/packs">
            View Training Packs
            </Link>
          </Col>
        </Row>
      </div>

    </div>
  );
}

export default PackScreen;
