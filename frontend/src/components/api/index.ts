import {Creds, Token} from "../forms/types";


const host = 'https://xzmkcrhmk0.execute-api.us-east-2.amazonaws.com';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Request-Headers': '*',
});


const post = <T extends {}>(uri: string, data: T) => fetch(uri, {
  method: 'POST',
  mode: 'cors',
  headers: getHeaders(),
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(data),
});

const get = (url: string) => fetch(`${host}/${url}`, {
  method: 'GET',
  headers: getHeaders(),
  referrerPolicy: 'no-referrer',
})


export async function fetchToken(creds: Creds) {
  const response = await post(`${host}/Prod/login`, creds);
  return await response.json();
}

export async function fetchCompanies(url: string) {
  const response = await get(``);

  console.log(response, 'res');

  return await response.json();
}
