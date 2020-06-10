import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import App from './App';
import Login from './components/login';

export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Home" component={App} />
          {/* No Match */}
          {/* <Route path="*">
            <Login />
          </Route> */}
        </Switch>
      </Router>
    )
  }
}
