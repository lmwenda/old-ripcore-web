import React from "react";
import Header from "../Components/Header";

function HomeScreen() {
  const title = "Rip Core";
  return (
    <div>
      <header>
        <Header title={title} />
      </header>

      <div>
        <h1 style={{ textAlign: "center" }}>RIP Core</h1>
      </div>
    </div>
  );
}

export default HomeScreen;
