import React from "react";
import { Row, Col } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import TypeWriter from "typewriter-effect";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// Styles
import "../Styles/dist/HomeScreen.css";

// Components
import Header from "../Components/Header";
import Introduction from "../Components/Introduction";

function HomeScreen() {
  // React Elements

  const [ node, setNode ] = React.useState(false);
  const [ homeScrollOff, setHomeScrollOff ] = React.useState(false);

  // OnClick Functions
  const ScrollFromHome = () => {
    setNode(true);
    setHomeScrollOff(true);
    console.log("Scroll From Home.");
  }

  // Initializations

  const title = "RIP Core";
  const youtubeURL = "https://www.youtube.com/watch?v=j1F-CosyaQY&ab_channel=RIPCore";

  return (
    <div style={{margin: 0}}>
      <header>
        {
          node ? null : <Header title={title} />
        }
      </header>
      <br />
      
      {
        homeScrollOff ? (
            <Introduction title="Beat the Elite" youtubeUrl={youtubeURL}
             scrollUp={true} scrollDown={true} /> 
          ) : (
          <section style={{ backgroundColor: "#fff" }} className="wrapper">
            <Row>
              <Col id="const">
                <h1 id="title" style={{ textAlign: "center" }}>

                  <TypeWriter onInit={(typewriter) => {
                    typewriter
                      .typeString("Your Plays,")
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString("Your Ways,")
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString("All Day!")
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString("Your Plays, Your Ways, All Day!")
                      .start();
                  }} />

                </h1> 
                <br />
                <div>
                  Rip Core is a rocket league training tool based 
                  around the recreation of RLCS moments.
                  You can choose to take the place of any professional 
                  player in these moments and try to make the plays that they did              
                </div>

                <div id="arrow"> 
                  <IconButton onClick={ScrollFromHome}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </div>
              </Col>
            </Row>
          </section>
        )
      }
      
    </div>
  );
}

export default HomeScreen;
