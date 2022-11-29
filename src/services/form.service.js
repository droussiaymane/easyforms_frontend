import axios from 'axios';

import jwt_decode from "jwt-decode";

const API_URL_FORM="http://localhost:8080/form/"

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
    method: 'DELETE' });
}

export const updateForm = async (formId, name,data) =>{
    return  axios.put(API_URL_FORM+"update?id="+formId+"&name="+name,  
    data);
}

export const updateFormStatus = async (formId) =>{
  return  axios(API_URL_FORM+"status?id="+formId);
}