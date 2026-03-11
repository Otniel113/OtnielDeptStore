import { useState } from 'react';
import { authAPI } from '../api-routes/api';

function parseJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function getStoredAuth() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  if (!token) return { token: null, user: null };
  const payload = parseJWT(token);
  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return { token: null, user: null };
  }
  return {
    token,
    user: { id: payload.user_id, status: payload.status, username: username || 'User' },
  };
}

export function useAuthController() {
  const [auth, setAuth] = useState(getStoredAuth);

  const user = auth.user;
  const token = auth.token;

  async function login(identity, password) {
    const res = await authAPI.login({ identity, password });
    const newToken = res.token;
    const payload = parseJWT(newToken);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', identity);
    setAuth({
      token: newToken,
      user: { id: payload.user_id, status: payload.status, username: identity },
    });
    return payload.status; // 'admin' or 'member'
  }

  async function register(username, email, password) {
    await authAPI.register({ username, email, password });
  }

  function logout() {
    authAPI.logout().catch(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth({ token: null, user: null });
  }

  return { user, token, login, register, logout };
}