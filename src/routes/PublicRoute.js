import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoged } from "../api/auth";

const PublicRoute = ({ component: Component, restricted, setRefreshCheckLogin, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isUserLoged()
        ? <Redirect to="/" />
        : <Component {...props} setRefreshCheckLogin={setRefreshCheckLogin} />
    )}
    />
  );
};

export default PublicRoute;