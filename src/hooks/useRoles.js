import { useState, useEffect } from 'react';
import { API_HOST } from '../utils/constant';
import { getToken } from "../api/auth";

export default function useRoles() {
  // State main
  const [state, setstate] = useState({
    data: [],
    load: true,
    error: null
  });
  // Api path
  const url = `${API_HOST}/api/roles`;
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
          data: data.items,
          load: false,
          error: null
        })
      })
    
  },[])

  return state;

}


