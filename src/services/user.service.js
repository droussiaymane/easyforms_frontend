import { idID } from '@mui/material/locale';
import axios from 'axios';

import jwt_decode from "jwt-decode";
import authService from './auth.service';

const API_URL_USER="http://localhost:8899/";

export function getUsername(){
  const token = localStorage.getItem("user")
  if(token!=undefined){
    const decodedToken = jwt_decode(token)
    const username = decodedToken["sub"]
    return username
  }
  
}

export function getUserRole(){
  let role = String(JSON.parse(localStorage.getItem("role")))
  if(!role.includes("ROLE_ADMIN")){
role="USER"
  }
  else{
     role="ADMIN"
  }
  return role
}

export const getUsers = async () => {
  return await axios(API_URL_USER+'getUsers', {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
  });
   
}
export const impersionate =  (userId) => {
// userid to    impersionate
// logout 
localStorage.setItem("user_",localStorage.getItem('user'))
localStorage.setItem("id_",localStorage.getItem('id'))
authService.logout();
// login with userId
return authService.loginTemporery(userId);

}


export const blockUser = async (username) => {
  return await axios(API_URL_USER+'blockUser/'+username, {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
  });
   
}


export const updateUserRoles = async (username, newRoles) => {
  return await axios.put(`${API_URL_USER}editUserRoles/${username}`, newRoles);
  
}


export const createUser = async (userData) => {
  return await axios.post(API_URL_USER+'registerNewUser',userData);
  
}

export const deleteUser = async (userName) => {
  return await axios(`${API_URL_USER}deleteUser/${userName}`, {
      method: 'DELETE',
      // credentials: 'include', // Don't forget to specify this if you need cookies

  }).catch((err) => {
      console.log(err)
    });
    
}

export const updateUser = async (userName, newUserData) => {
  return await axios.put(`${API_URL_USER}updateUser/${userName}`,newUserData);
}

export const getUserRolesByUsername = async (userName) => {
  return await axios(`${API_URL_USER}getUserRole/${userName}`, {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies

  })
 
}