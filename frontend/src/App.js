import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import HomeScreen from "./Screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="app">
          <Route path="/" component={HomeScreen} exact />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
