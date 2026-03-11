const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, { body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) Object.assign(headers, authHeaders());

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_URL}${path}`, options);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || `Request failed (${res.status})`);
  }

  return text ? JSON.parse(text) : null;
}

// Auth
export const authAPI = {
  register: (data) => request('POST', '/register', { body: data }),
  login: (data) => request('POST', '/login', { body: data }),
  logout: () => request('POST', '/logout'),
};

// Categories
export const categoryAPI = {
  getAll: () => request('GET', '/categories'),
  getById: (id) => request('GET', `/categories/${id}`),
  create: (data) => request('POST', '/categories', { body: data, auth: true }),
  update: (id, data) => request('PUT', `/categories/${id}`, { body: data, auth: true }),
  delete: (id) => request('DELETE', `/categories/${id}`, { auth: true }),
};

// Products
export const productAPI = {
  getAll: (name = '') =>
    request('GET', `/products${name ? `?name=${encodeURIComponent(name)}` : ''}`),
  getById: (id) => request('GET', `/products/${id}`),
  create: (data) => request('POST', '/products', { body: data, auth: true }),
  update: (id, data) => request('PUT', `/products/${id}`, { body: data, auth: true }),
  delete: (id) => request('DELETE', `/products/${id}`, { auth: true }),
};

// Checkout
export const checkoutAPI = {
  checkout: (items) => request('POST', '/checkout', { body: { items }, auth: true }),
};
