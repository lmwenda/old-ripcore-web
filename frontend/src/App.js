import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Screens
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import DownloadScreen from "./Screens/DownloadScreen";
import SubscriptionScreen from "./Screens/SubscriptionScreen";
import PackUplaod from "./Screens/PackUpload";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/signup" component={SignupScreen} exact />
        <Route path="/download" component={DownloadScreen} exact />
        <Route path="/admin" component={PackUplaod} />
        <Route path="/subscriptions" component={SubscriptionScreen} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
