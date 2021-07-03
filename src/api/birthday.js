import { useState, useEffect } from 'react';
import { API_HOST } from "../utils/constant";
import { getToken } from "../api/auth";

export const useGetBirthday = () => {
  // State
  const [birthday, setBirthday] = useState({
    data: [],
    load: true
  })
  // Api path
  const url = `${API_HOST}/api/birthday`;
  // Generate the params
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }
  }
  useEffect(() => {
    fetch(url, params)
      .then(response => response.json())
      .then(result => setBirthday({data:result.items,load:false}))
      .catch(error => console.log('error', error));
  },[]);
  return birthday;
}