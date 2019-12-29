import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./middleware/auth";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path="/app" component={Home} />
      <PrivateRoute exact path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
