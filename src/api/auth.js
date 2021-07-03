import { API_HOST, TOKEN, USERDATA } from "../utils/constant";

// Function for LoginApp
export const loginApi = async (user) => {
  // Api path
  const url = `${API_HOST}/api/login`;
  // Data user
  const data = {
    email: user.username.toLowerCase(),
    password: user.password
  }
  // Generate the params
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  }
  // Fetch request api login
  const response = await fetch(url, params);
  // Json params
  const result = await response.json();
  // Return response;
  return result;
}

// Function auth token
export const setToken = (token) => {
  // Save token
  localStorage.setItem(TOKEN, token);
}

// Function get token to local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN);
}

// Remove token API
export const removeTokenApi = async (token) => {
  // Api path
  const url = `${API_HOST}/api/logout`;
  // Generate the params
  const params = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  // Fetch request api login
  const response = await fetch(url, params);
  // Json params
  const result = await response.json();
  // Return response;
  return result;
}

// Logout the token user
export const logoutUser = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USERDATA);
}

// Function verify loged user
export const isUserLoged = () => {
  // Get the token
  const token = getToken();
  //Valid the token
  if (!token) {
    logoutUser();
    return null;
  }
  return token;
}

// Function save data user
export const setUserData = (userData) => {
  // Save token
  localStorage.setItem(USERDATA, userData);
}

// Function get user data to local storage
export const getUserData = () => {
  return localStorage.getItem(USERDATA);
}

export const loginGoogle = async () => {
  // Api path
  const url = `${API_HOST}/api/auth/google`;
  // Generate the params
  const params = {
    method: "GET",
  }
  // Fetch request api login
  const response = await fetch(url, params);
  // Json params
  const result = await response.text();
  // Return response;
  return result;
}