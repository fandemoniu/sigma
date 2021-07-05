import React, { useState, useEffect } from 'react';
import { API_HOST } from "../../utils/constant";

export default function Google(props) {
  console.log(props)
  const [login, setLogin] = useState({
    loading: true,
    error: null,
    data: {},
  })
  useEffect(() => {
    fetch(`${API_HOST}/api/auth/google/callback${props.location.search}`, { method: "GET" })
      .then(response => response.json())
      .then(data => setLogin({ loading: false, data }))
      .catch(error => console.log('error', error));
  }, [])
  console.log(login);
  return (
    <div>
      <h1>Google</h1>
    </div>
  )
}
