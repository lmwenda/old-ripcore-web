import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Screens
import HomeScreen from "./Screens/HomeScreen";

function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" component={HomeScreen} exact />
            </Switch>
        </BrowserRouter>
    );
}

export default App;