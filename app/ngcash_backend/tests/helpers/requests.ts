const fetch = require('node-fetch');
import { User, RequestTransaction } from "../types/types";

const BASE_URL = process.env.BASE_URL || 'localhost';

export async function post(user:User, path:string) {
  return await fetch(`http://${BASE_URL}:3001${path}`,
    { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } }
  );
};

export async function postWithToken(data:RequestTransaction, path:string, token:string, id:number) {
  return await fetch(`http://${BASE_URL}:3001${path}/${id}`,
    { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', 'Authorization': token } }
  );
};

export async function get(id:number, token:string, path:string) {
  return await fetch(`http://${BASE_URL}:3001${path}/${id}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': token } }
  );
}

export async function getWithParams(id:number, token:string, path:string, params:string) {
  return await fetch(`http://${BASE_URL}:3001${path}/${id}${params}`,
    { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': token } }
  );
}
