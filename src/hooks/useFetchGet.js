import { useState, useEffect } from 'react';
import { API_HOST } from '../utils/constant';
import { getToken } from "../api/auth";

export default function useFetchGet(urlParams) {
  // State main
  const [state, setstate] = useState({
    data: [],
    loading: true,
    error: null
  });
  // Api path
  const url = `${API_HOST + urlParams}`;
  // Paramers
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }
  }
  useEffect(() => {
    fetch(url, params)
      .then( resp => resp.json() )
      .then( data => {
        setstate({
          data: data,
          loading: false,
          error: null
        })
      })
    
  },[])

  return state;
  
}
