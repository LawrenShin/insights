import {Creds} from "../forms/types";
import {ListRequestConfig} from "../../components/listDuck";


// const host = 'https://xzmkcrhmk0.execute-api.us-east-2.amazonaws.com/Prod';
const host = process.env.REACT_APP_HOST || process.env.HOST;

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

export const get = (url: string, params?: string) =>
  fetch(`${host}/${url}/${params ? '?'+params : ''}`, {
    method: 'GET',
    headers: getHeaders(),
    referrerPolicy: 'no-referrer',
  })

export const del = ({ url, params }: ListRequestConfig) =>
  fetch(`${host}/${url}/${params ? '?'+params : ''}`, {
    method: 'DELETE',
    headers: getHeaders(),
    referrerPolicy: 'no-referrer',
  })

export async function deleteReq(config: ListRequestConfig) {
  const response = await del(config);
  const parsed = await response.json();
  if (!response.ok || response.status !== 200) throw new Error(parsed.status);
  return parsed;
}

// TODO: can refactor these and place 'em all in one
export async function fetchToken(creds: Creds) {
  const response = await post(`login`, creds);
  return await response.json();
}

export async function anyFormApi(company: any, formName: string) {
  const response = await post(formName === 'company' ? 'companies' : 'people', company);
  return await response.json();
}

export async function fetchCompanies(params: string) {
  const response = await get(`companies`, params);
  return await response.json();
}

export async function fetchDicts() {
  const response = await get(`dictionaries`);
  const parsed = await response.json();
  if (!response.ok || response.status !== 200) throw new Error(parsed.status);
  return parsed;
}
export async function fetchMeta() {
  const response = await get(`metadata`);
  const parsed = await response.json();
  if (!response.ok || response.status !== 200) throw new Error(parsed.status);
  return parsed;
}

export async function fetchList(config: ListRequestConfig) {
  const response = await get(config.url, config?.params);
  const parsed = await response.json();
  if (!response.ok || response.status !== 200) throw new Error(parsed.status);
  return parsed;
}


