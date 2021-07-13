import { useState, useEffect } from 'react';
import { API_HOST } from '../utils/constant';
import { getToken } from "../api/auth";

export default function useUsers(bandera) {
  // State main
  const [state, setstate] = useState({
    data: [],
    loading: true,
    error: null
  });
  // Api path
  const url = `${API_HOST}/api/users`;
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
          loading: false,
          error: null
        })
      })
    
  },[bandera])

  return state;

}

export const getUser = async (id) => {
  // Api path
  const url = `${API_HOST}/api/users/${id}`;
  // Generate the params
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }
  }
  // Fetch request api login
  const response = await fetch(url, params);
  // Json params
  const result = await response.json();
  // Return response;
  return result.items;
}


