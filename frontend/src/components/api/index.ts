interface Creds {
  UserName: string;
  Password: string;
}

export async function fetchToken(url: string, creds: Creds) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': '*',
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(creds)
  });
  console.log(response, 'res');
  return await response.json();
}
