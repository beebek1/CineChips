import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  id?: number | string;
  role?: string;
  iat?: number;
  exp?: number;
};

const TOKEN_KEY = "jwtToken";

const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

const isExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 <= Date.now();
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getUserIdFromToken = (): string | null => {
  const token = getToken();
  if (!token || isExpired(token)) {
    clearToken();
    return null;
  }

  const decoded = decodeToken(token);
  if (decoded?.id === undefined || decoded?.id === null) {
    clearToken();
    return null;
  }

  return String(decoded.id);
};

const getUserRole = async (): Promise<string | null> => {
  const token = getToken();
  if (!token || isExpired(token)) {
    clearToken();
    return null;
  }

  const decoded = decodeToken(token);
  const role = decoded?.role ?? null;

  if (!role) {
    clearToken();
    return null;
  }

  return role;
};

export default getUserRole;
