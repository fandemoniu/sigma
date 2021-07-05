import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoged } from "../api/auth";

const PrivateRoute = ({ component: Component, setRefreshCheckLogin, ...rest }) => {
  return (
    <Route {...rest} render={ props => (
      isUserLoged() 
        ? <Component {...props} setRefreshCheckLogin={setRefreshCheckLogin} />
        //: <Redirect to="/" />
        : <Reb setRefreshCheckLogin={setRefreshCheckLogin}/>
    )} />
  );
};

const Reb = ( {setRefreshCheckLogin} ) => {
  setRefreshCheckLogin(true);
  return(
    <Redirect to="/" />
  );
}

export default PrivateRoute;