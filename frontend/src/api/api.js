let csrfToken = null;

export async function getCsrfToken() {
  const res = await fetch('/api/user/csrf-token', { credentials: 'include' });
  const data = await res.json();
  csrfToken = data.csrfToken;
  return csrfToken;
}

export async function login(email, password) {
  await getCsrfToken(); 
  const res = await fetch('/api/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function whoami() {
  if (!csrfToken) await getCsrfToken();
  const res = await fetch('/api/user/whoami', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'x-csrf-token': csrfToken,
    },
  });
  return res.json();
}

export async function logout() {
  if (!csrfToken) await getCsrfToken();
  const res = await fetch('/api/user/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'x-csrf-token': csrfToken,
    },
  });
  return res.json();
}
