import { API_HOST } from "../utils/constant";
import { getToken } from "../api/auth";

export const getTeam = async (id) => {
  // Api path
  const url = `${API_HOST}/api/job-request/${id}`;
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

export const updateStatus = async (data, id) => {
  // Api path
  const url = `${API_HOST}/api/job-request/${id}`;
  // Generate the params
  const params = {
    method: "PUT",
    body: JSON.stringify({
      status: data.status
    }),
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

export const getFile = async (id) => {
  // Api path
  const url = `${API_HOST}/api/download-file/${id}`;
  // Generate the params
  const params = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    }
  }
  // Fetch request api login
  fetch(url, params)
    .then( resp => {
      return resp.blob();
    }).then( blob => {
      return blob;
    })
  // // Json params
  // const result = await response.json();
  // // Return response;
  // return result.items;
}
