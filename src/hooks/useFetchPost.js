import { useState, useEffect } from 'react';
import { API_HOST } from '../utils/constant';

export function UseFetchPost(token, data, urlParams) {
  // State initial
  const [state, setstate] = useState({
    data: null,
    loading: true,
    error: null
  });
  // Api path
  const url = `${API_HOST + urlParams}`;
  // Data to send
  const dataApi = {data}
  // Paramers
  const params = {
    method: "POST",
    body: JSON.stringify(dataApi),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  useEffect(() => {
    fetch(url, params)
      .then( resp => resp.json() )
      .then( data => {
        setstate({
          data,
          loading: false,
          error: null
        })
      })
    
  },[])
  return state;
}
