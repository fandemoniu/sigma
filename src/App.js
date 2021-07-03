import { useState, useEffect } from "react";
import Login from "./pages/login";

import ReactNotification from "react-notifications-component";
import { AuthContext } from "./utils/contexts";
import { isUserLoged } from "./api/auth";

import Routing  from "./routes/Routing";

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
  // Return main
  return (
    <AuthContext.Provider value={user}>
      <ReactNotification /> 
      { user ? <Routing setRefreshCheckLogin={setRefreshCheckLogin} /> : <Login setRefreshCheckLogin={setRefreshCheckLogin} /> }
    </AuthContext.Provider>
  );
}
