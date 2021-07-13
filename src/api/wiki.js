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
  const files = !!article.documents && article.documents;
  // Api path
  const url = `${API_HOST}/api/articles`;
  let formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('section_id', article.section_id);
    formData.append('index', article.index);
    formData.append('folio', article.folio);
    formData.append('description', article.description);
    formData.append('version_code', article.version_code);
    files &&
      files.map( file => {
          formData.append('documents[]', file);
      })
    
  // Generate the params
  const params = {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: formData
  }
  // Fetch request api login
  const response = await fetch(url, params);
  console.log(response);
  // Json params
  const result = await response.json();
  console.log(result);
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