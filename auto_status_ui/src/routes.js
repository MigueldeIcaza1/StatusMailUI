import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import App from './App';
import Login from './components/login';
import LoginStyled from "./components/loginStyled";
import settings from "./components/settings";

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route path="/" exact component={Login} /> */}
          <Route path="/" exact component={LoginStyled} />
          <Route path="/Home" component={App} />
          <Route path="/Settings" component={settings} />
          {/* No Match */}
          {/* <Route path="*">
            <Login />
          </Route> */}
        </Switch>
      </Router>
    )
  }
}
