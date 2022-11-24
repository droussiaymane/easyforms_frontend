import axios from 'axios';

import jwt_decode from "jwt-decode";

const API_URL_USER="http://localhost:9090/";

export function getUsername(){
  const token = localStorage.getItem("user")
  const decodedToken = jwt_decode(token)
  const username = decodedToken["sub"]
  return username
}

export function getUserRole(){
  const role = localStorage.getItem("role")
  
  return role
}

export const getUsers = async () => {
  const data = await axios(API_URL_USER+'getUsers', {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user") }
  });
  const users = await data.json();
  return users  
}

export const updateUserRoles = async (username, newRoles) => {
  const data = await axios(`${API_URL_USER}editUserRoles/${username}`, {
      method: 'PUT',
      body: JSON.stringify(newRoles),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user"), 'Content-Type': 'application/json' },

  });
  const users = await data.json();
  return users  
}

export const createUser = async (userData) => {
  const data = await axios(API_URL_USER+'registerNewUser', {
      method: 'POST',
      body: JSON.stringify(userData),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user"), 'Content-Type': 'application/json' },

  });
  const newUser = await data.json();
  return newUser  
}

export const deleteUser = async (userName) => {
  return await axios(`${API_URL_USER}deleteUser/${userName}`, {
      method: 'DELETE',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user")},

  }).catch((err) => {
      console.log(err)
    });
    
}

export const updateUser = async (userName, newUserData) => {
  return await axios(`${API_URL_USER}updateUser/${userName}`, {
      method: 'PUT',
      body: JSON.stringify(newUserData),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user"), 'Content-Type': 'application/json' },

  }).catch((err) => {
      console.log(err)
    });
}

export const getUserRolesByUsername = async (userName) => {
  const data = await axios(`${API_URL_USER}getUserRole/${userName}`, {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("user") },

  })
  const roles = await data.json();
  return roles
}