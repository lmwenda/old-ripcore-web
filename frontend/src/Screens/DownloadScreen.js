import React from "react";
import { Row, Col } from "react-bootstrap";

// Styles
import '../Styles/dist/DownloadScreen.css'

// Components
import Header from "../Components/Header";
import logo from "../Global/Images/logo.jpg";

function DownloadScreen(){
    const title = "RIP Core";
    return(
        <div>
            <header>
                <Header title={title} />
            </header>
            <br/>
            <div className="wrapper">
                <Row>
                    <Col id="const">

                        {/* <img style={{ height: "200px", 
                         borderRadius: '4px', 
                         marginTop: '10px' }} id="picture" src={logo} alt="" /> */}
                         
                        <h1 id="title" style={{textAlign: 'center'}}>
                            Thank you for downloading Rip Core!
                        </h1>

                        <p style={{textAlign: 'center'}}>
                        If the download didn't start click the button below to 
                        start
                        </p>

                        <button id="download-button">
                            Download Rip Core
                        </button>
                        
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DownloadScreen;