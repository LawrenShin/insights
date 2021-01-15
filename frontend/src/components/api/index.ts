import {Creds, Token} from "../forms/types";


const host = 'https://xzmkcrhmk0.execute-api.us-east-2.amazonaws.com';

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

const get = (url: string, params?: string) => fetch(`${host}/${url}/${params ? '?'+params : ''}`, {
  method: 'GET',
  headers: getHeaders(),
  referrerPolicy: 'no-referrer',
})


export async function fetchToken(creds: Creds) {
  const response = await post(`Prod/login`, creds);
  return await response.json();
}

export async function fetchCompanies() {
  // TODO: move params
  const response = await get(`Prod/companies`, 'page_size=1&page_index=1');

  console.log(response, 'res');

  return await response.json();
}
