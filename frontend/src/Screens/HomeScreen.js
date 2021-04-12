import React from "react";

// Styles
import "../Styles/dist/HomeScreen.css";

// Components
import Header from "../Components/Header";
import Video from "../Components/Video";

function HomeScreen() {

  // Initializations

  const title = "RIP Core";
  const youtubeURL = "https://www.youtube.com/watch?v=j1F-CosyaQY&ab_channel=RIPCore";

  return (
    <div className="homeScreen" style={{margin: 0, background: "#465362", color: "#fff"}}>
      <header>
        <Header title={title} activeHome={true} />
      </header>

      <br />

      <div className="home-tag"><h1>Home Page</h1></div>
      
      <div style={{ marginTop: 0, backgroundColor: "#a0a09f", color: '#fff' }}
      className="wrapper">
          <div>
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

          <div className="video">
            <Video youtubeUrl={youtubeURL} />
          </div>

      </div>

    </div>
  );
}

export default HomeScreen;
