import {Creds, Token} from "../forms/types";
import {ListRequestConfig} from "../../components/listDuck";


const host = 'https://xzmkcrhmk0.execute-api.us-east-2.amazonaws.com/Prod';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Headers': '*',
  'x-api-token': localStorage.getItem('token') || '',
});


const post = <T extends {}>(url: string, data: T) => fetch(`${host}/${url}`, {
  method: 'POST',
  mode: 'cors',
  headers: getHeaders(),
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(data),
});

export const get = (url: string, params?: string) => fetch(`${host}/${url}/${params ? '?'+params : ''}`, {
  method: 'GET',
  headers: getHeaders(),
  referrerPolicy: 'no-referrer',
})


export async function fetchToken(creds: Creds) {
  const response = await post(`login`, creds);
  return await response.json();
}

export async function fetchCompanies(params: string) {
  const response = await get(`companies`, params);
  return await response.json();
}

export async function fetchDicts() {
  const response = await get(`dictionaries`);
  return await response.json();
}
export async function fetchMeta() {
  const response = await get(`metadata`);
  return await response.json();
}

export async function fetchList(config: ListRequestConfig) {
  const response = await get(config.url, config?.params);
  return await response.json();
}
