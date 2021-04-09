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

  // Initializations

  const title = "RIP Core";
  const youtubeURL = "https://www.youtube.com/watch?v=j1F-CosyaQY&ab_channel=RIPCore";

  return (
    <div style={{margin: 0, background: "#465362", color: "#fff"}}>
      <header>
        {
          node ? null : <Header title={title} activeHome={true} />
        }
      </header>

      <br />

      <div className="home-tag"><h1>Home Page</h1></div>
      
      <div style={{ marginTop: 0, backgroundColor: "#a0a09f", color: '#fff' }}
      className="wrapper">
          <h1 id="title" style={{ textAlign: "left", color: '#fff' }}>
            Your Plays,
          </h1>
          <h1 id="title" style={{ textAlign: "left", color: '#fff' }}>
            Your Ways,
          </h1> 
          <h1 id="title" style={{ textAlign: "left", color: '#fff' }}>
            All Day!
          </h1> 

      </div>
    </div>
  );
}

export default HomeScreen;
