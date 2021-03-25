import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Screens

import PackScreen from "./Screens/PackScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import UserSettings from "./Screens/UserSettings";
import TrainingScreen from "./Screens/TrainingScreen";
import DownloadScreen from "./Screens/DownloadScreen";
import SubscriptionScreen from "./Screens/SubscriptionScreen";

// Protected Routes

// import { UserProtectedRoute } from "./ProtectedRoutes"; // HAS SOME ISSUES DONT USE

function App() {
  const _id = localStorage.getItem("_id");

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/download" component={DownloadScreen} />
        <Route path="/signup" component={SignupScreen} exact />
        <Route path="/admin" component={PackScreen} exact />
        <Route path="/subscriptions" component={SubscriptionScreen} />
        <Route path="/admin/packs" component={TrainingScreen} exact />

        <Route path={`/settings/${_id}`} component={UserSettings} />

        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
