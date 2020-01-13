import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./middleware/auth";
import Login from "./pages/login";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Menu from "./pages/menu";
import Header from "./components/header";
import { NavLeft } from "./components/nav";

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
    <Route exact path="/" component={Login} />
    <Route path="/app" component={Header} />
    <section className="row">
      <Route path="/app" component={NavLeft} />
      <Switch>
        <PrivateRoute exact path="/app" component={Home} />
        <PrivateRoute exact path="/app/profile" component={Profile} />
        <PrivateRoute exact path="/app/menu" component={Menu} />
      </Switch>
    </section>
  </BrowserRouter>
);

export default Routes;
