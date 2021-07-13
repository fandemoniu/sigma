import React, { useState, useEffect } from 'react';
import { API_HOST } from "../../utils/constant";
import { setToken, setUserData } from "../../api/auth";

export default function Google(props) {
  const {setRefreshCheckLogin} = props;
  const [login, setLogin] = useState({
    loading: true,
    error: null,
    data: {},
  })
  useEffect(() => {
    fetch(`${API_HOST}/api/auth/google/callback${props.location.search}`, { method: "GET" })
      .then(response => response.json())
      .then(data => {
        // Save the token
        setToken(data.token);
        // Save data
        setUserData(JSON.stringify(data.items.profile));
        // Set state refresh login
        setRefreshCheckLogin(true);
      })
      .catch(error => console.log('error', error));
  }, [])
  return (
    <div className="text-center">
      <h1>Auth google ...</h1>
    </div>
  )
}
