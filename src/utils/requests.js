import axios from 'axios';
import fetch from 'isomorphic-fetch';

const API_URL_FORM="http://localhost:8895/form/"
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  OPTIONS: '',
};

export function post(url, data) {
  return axios.post(url,  
    data.task_data  ).then(response => response).catch(err=>console.log(err));
}

export function getmyform(formId) {
  return fetch(API_URL_FORM+"get?id="+formId, {
    method: 'GET',
    headers,
  }).then(response => response.json());
}
