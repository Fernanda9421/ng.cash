import axios from  'axios';
import { IBodyForm, IRequest } from './interfaces';

const port = process.env.REACT_APP_BACKEND_PORT || '3001';
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost';

const api = axios.create({
  baseURL: `${baseURL}:${port}`,
});

export const requestPost= async (endpoint:string, body:IBodyForm) => {
  const { data } = await api.post(endpoint, body);
  return data;
};
