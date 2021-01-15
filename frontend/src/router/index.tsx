import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import PrivateRoute from './private';
import SignIn from '../pages/SignIn';
import Companies from '../pages/Companies';
// import NotFound from "../NotFound";

const AppRouter = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path='/' component={SignIn} isPrivate />
      <PrivateRoute exact path='/sign_in' component={SignIn} />
      <PrivateRoute exact path='/companies' component={Companies} isPrivate />
    {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

export default (AppRouter);