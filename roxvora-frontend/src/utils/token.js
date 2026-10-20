const TOKEN_KEY = 'roxvora_auth_token';
const REFRESH_TOKEN_KEY = 'roxvora_refresh_token';
const USER_KEY = 'roxvora_user';

const getStorage = () => window.sessionStorage;

const clearLegacyItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Legacy localStorage may be unavailable; never use it as a token fallback.
  }
};

export const getToken = () => {
  clearLegacyItem(TOKEN_KEY);
  return getStorage().getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  getStorage().setItem(TOKEN_KEY, token);
  clearLegacyItem(TOKEN_KEY);
};

export const removeToken = () => {
  getStorage().removeItem(TOKEN_KEY);
  getStorage().removeItem(REFRESH_TOKEN_KEY);
  getStorage().removeItem(USER_KEY);
  clearLegacyItem(TOKEN_KEY);
  clearLegacyItem(REFRESH_TOKEN_KEY);
  clearLegacyItem(USER_KEY);
};

export const getRefreshToken = () => {
  clearLegacyItem(REFRESH_TOKEN_KEY);
  return getStorage().getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token) => {
  getStorage().setItem(REFRESH_TOKEN_KEY, token);
  clearLegacyItem(REFRESH_TOKEN_KEY);
};

export const getUser = () => {
  try {
    const user = getStorage().getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setUser = (user) => {
  getStorage().setItem(USER_KEY, JSON.stringify(user));
  clearLegacyItem(USER_KEY);
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};