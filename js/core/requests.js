const backendURL = 'http://localhost:5501'; // or your API base
const headers = { 'Content-Type': 'application/json' };

function normalizePath(path) {
  return `${backendURL}/${path.replace(/^\/+/, '')}`;
}

async function handleResponse(response) {
  const contentType = response.headers.get('Content-Type');

  let data;
  if (contentType?.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text(); // fallback for non-JSON responses
  }

  if (!response.ok) {
    throw { status: response.status, data };
  }

  return data;
}

export async function getRequest(path) {
  const url = normalizePath(path);
  const response = await fetch(url, { headers });
  return handleResponse(response);
}

export async function postRequest(path, payload) {
  const url = normalizePath(path);
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function putRequest(path, payload) {
  const url = normalizePath(path);
  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function deleteRequest(path) {
  const url = normalizePath(path);
  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });
  return handleResponse(response);
}
