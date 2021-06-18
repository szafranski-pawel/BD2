import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AddEmployee from "./containers/AddEmployee";
import ScooterList from './containers/ScooterList';
import { useAppContext } from "./libs/contextLib";

export default function Routes() {
  const { isAuthenticated, isAdmin } = useAppContext();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/scooters" render = {() => (isAuthenticated ?  (<ScooterList />) : (<Redirect to="/login" />))} />
      <Route exact path="/add_employee" render = {() => ((isAdmin && isAuthenticated) ?  (<AddEmployee />) : (<Redirect to="/login" />))} />
      <Route component={NotFound} />
    </Switch>
  );
}
