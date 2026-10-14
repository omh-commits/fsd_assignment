// Small helpers around fetch(). Every call goes to the Express server under /api.
// When the server answers with an error, the helper throws it so the page can
// show err.message to the user.

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong. Please try again.');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function getJSON(url) {
  return fetch('/api' + url).then(handleResponse);
}

export function postJSON(url, body = {}) {
  return fetch('/api' + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(handleResponse);
}

// For forms with a file (the profile picture)
export function postForm(url, formData) {
  return fetch('/api' + url, { method: 'POST', body: formData }).then(handleResponse);
}
