import axios from  'axios';
import { IBodyForm } from './interfaces';

const port = process.env.REACT_APP_BACKEND_PORT || '3001';
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost';

export const api = axios.create({
  baseURL: `${baseURL}:${port}`
});

export const setToken = (token:string) => {
  api.defaults.headers.common['Authorization'] = token;
};

export const requestPost = async (endpoint:string, body:IBodyForm) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestGet = async (endpoint:string) => {
  const { data } = await api.get(endpoint);
  return data;
};
