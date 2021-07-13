import { API_HOST } from "../utils/constant";
import { getToken } from "../api/auth";

export const createRol = async (data) => {
  // Api path
  const url = `${API_HOST}/api/roles`;
  // Generate the params
  const params = {
    method: "POST",
    body: JSON.stringify(data),
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
  return result;
}

export const editRol = async (data, id) => {
  // Api path
  const url = `${API_HOST}/api/roles/${id}`;
  // Generate the params
  const params = {
    method: "PUT",
    body: JSON.stringify(data),
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
  return result;
}

export const editUserRol = async (data, id) => {
  // Api path
  const url = `${API_HOST}/api/users/${id}`;
  // Generate the params
  const params = {
    method: "PUT",
    body: JSON.stringify(data),
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
  return result;
}
