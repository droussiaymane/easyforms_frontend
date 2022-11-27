import axios from 'axios';

import jwt_decode from "jwt-decode";

const API_URL_FORM="http://localhost:8895/form/"

export const getForm = async (formId) =>{
    return axios(API_URL_FORM+"get?id="+formId, {
      method: 'GET' });
     
}

export const getAllForms = async (formId) =>{
  return axios(API_URL_FORM+"getallforms", {
    method: 'GET' });
}


export function addForm(data,name) {
  return axios.post(API_URL_FORM+"add?name="+name,  
    data);
}


export const deleteForm = async (formId) =>{
  return axios(API_URL_FORM+"delete?id="+formId, {
    method: 'GET' });
}

export const updateForm = async (formId, newInputs) =>{
    return await axios(`http://localhost:9090/updateForm/${formId}`, {
      method: 'PUT',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify({
        "firstField": newInputs[0],
        "secondField": newInputs[1],
        "thirdField": newInputs[3],
      }),
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'application/json' }
    }).catch((err) => {
        console.log(err)
    });  
}