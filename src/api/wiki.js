import { API_HOST } from "../utils/constant";
import { getToken } from "../api/auth";

// Remove token API
export const getWikiApi = async (token) => {
  // Api path
  const url = `${API_HOST}/api/sections`;
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
  return result;
}

export const createArticleApi = async (token, article) => {
  // Api path
  const url = `${API_HOST}/api/articles`;
  // Data user
  const data = {
    title: article.title,
    content: article.content,
    section_id: article.section_id,
    index: article.index,
    folio: article.folio,
    description: article.description,
    version_code: article.version_code
  }
  // Generate the params
  const params = {
    method: "POST",
    body: JSON.stringify(data),
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

export const getWikiApiOnly = async (id) => {
  // Api path
  const url = `${API_HOST}/api/articles/${id}`;
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
  return result;
}

export const updateArticleApi = async (article, id) => {
  // Api path
  const url = `${API_HOST}/api/articles/${id}`;
  // Data user
  const data = {
    title: article.title,
    content: article.content,
    section_id: article.section_id,
    index: article.index,
    folio: article.folio,
    description: article.description,
    version_code: article.version_code
  }
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

export const createSections = async (section) => {
  // Api path
  const url = `${API_HOST}/api/sections`;
  // Data user
  // Generate the params
  const params = {
    method: "POST",
    body: JSON.stringify(section),
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