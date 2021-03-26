import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import Pack from "../Components/Pack";
import Header from "../Components/Header";
import PackUpload from "../Components/PackUpload";

import '../Styles/dist/PackScreen.css';

function PackScreen() {
  const [ packs, setPacks ] = React.useState([]);

  const title = "RIP Core Admin";

  React.useEffect(() => {
    async function getProducts(){
      const { data } = await axios.get("http://locahost:5000/api/pack/");
      console.log(data);
      setPacks(data);
    }

    getProducts();
}, [])


  return (
    <div className="packscreen">

      <header>
        <Header title={title} />
      </header>
      
      <br />

      <div className="header_main">
        <input id="search" type="input" placeholder="Search for Packs" />
        <Link to="/admin/set-admin">
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Link>
      </div>

      <div className="packscreen_upload">
        <Row>
          <Col>
            <h2>Pack Upload</h2>
            <PackUpload />
          </Col>
        </Row>
      </div>

      <div className="packscreen_packs">
        <h3>No Packs Currently Available</h3>
      </div>

    </div>
  );
}

export default PackScreen;
