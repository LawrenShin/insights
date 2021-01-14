import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, useHistory} from 'react-router-dom';

interface State {
  isAuthenticated: boolean;
}

interface OwnProps {
  component: React.FC<any>;
  isPrivate?: boolean;
  exact?: boolean,
  path?: string | string[],
}

interface Props extends State, OwnProps {};

const isAuthRedirect = (isAuthenticated: boolean, Component: React.ElementType, props: any) => isAuthenticated ? (
    <Component {...props} />
  ):(
    <Redirect to="/sign_in" />
  )

export const PrivateRoute = (
  {
    isAuthenticated,
    component: Component,
    isPrivate,
    exact,
    path,
  }: Props) => (
  <Route
    exact={exact}
    path={path}
    component={(props: any) => (
      isPrivate ?
          isAuthRedirect(isAuthenticated, Component, props)
        :
        path !== '/sign_in' ? <>
          <Component {...props} />
        </>
          :
        <Redirect to="/companies" />
    )}
  />
);

const mapStateToProps = (state: any) => ({
  isAuthenticated: !!state.SignInReducer.token,
});

export default connect(mapStateToProps)(PrivateRoute);