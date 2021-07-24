import { useState, useEffect } from "react";
import Login from "./pages/login";
import Google from "./pages/google";

import { map } from "lodash";
import configRouting from "./routes/configRouting";
import configRoutingPublic from "./routes/configRoutingPublic";

import ReactNotification from "react-notifications-component";
import { AuthContext } from "./utils/contexts";
import { isUserLoged } from "./api/auth";
import { BrowserRouter as Router, Switch, Redirect, HashRouter } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  // Userstate for the user
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isUserLoged());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin])

  if (!loadUser) return null;
  return (
    <AuthContext.Provider value={user}>
      <ReactNotification />
      <Router>
        <Switch>
          {
            user
              ?
              map(configRouting, (route, index) => (
                <PrivateRoute
                  key={index}
                  setRefreshCheckLogin={setRefreshCheckLogin}
                  component={route.page}
                  path={route.path}
                  exact={route.exact}
                />
              ))
              :
              map(configRoutingPublic, (r, i) => (
                <PublicRoute 
                  key={i}
                  setRefreshCheckLogin={setRefreshCheckLogin} 
                  restricted={false} 
                  component={r.page}
                  path={r.path} 
                  exact={r.exact}
                />
              ))
          }
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}
