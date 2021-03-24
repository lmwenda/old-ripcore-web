import React from "react";
import { Route, Redirect } from "react-router-dom";

export const UserProtectedRoute = (props, { component: Component, ...rest }) => {
    const token = localStorage.getItem("token");
    return token ?  
      <Route 
        {...rest}
        render={props =>
          <Component {...props} />}
        />
        : <Redirect to={{
          pathname: '/login',
          state: {
            from: props.location
          }
        }} />
}