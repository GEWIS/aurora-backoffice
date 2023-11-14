import jwtDecode, { type JwtPayload } from "jwt-decode";
import { useAuthStore } from "@/stores/auth.store";

export interface AuthStoreToken {
  exp: number,
  iat: number,
  auth_time: number,
  jti: string,
  iss: string,
  aud: string,
  sub: string,
  typ: string,
  azp: string,
  nonce: string,
  session_state: string,
  at_hash: string,
  sid: string,
  resource_access: {
    'narrowcasting-test': {
      roles: string[]
    }
  }
  given_name: 'string'
}

export function isAuthenticated(): boolean {
  const token = getTokenFromStorage();
  if (!token) return false;
  const decoded = jwtDecode<JwtPayload>(token!) as AuthStoreToken;
  return !isTokenExpired(Number(decoded.exp));
}

export function getTokenFromStorage(): string {
  return localStorage.getItem('oidc_token') as string;
}

export function clearTokenInStorage() {
  localStorage.clear();
}

export function setTokenInStorage(oidcToken: string) {
  localStorage.setItem('oidc_token', oidcToken);
}

export function isTokenExpired(tokenEpochTimestamp: number): boolean {
  const tokenExpirationTime = tokenEpochTimestamp * 1000;
  const currentTimestamp = new Date().getTime();
  return currentTimestamp > tokenExpirationTime;
}

export function populateStoresFromToken() {
  const isAuth = isAuthenticated();

  if (isAuth) {
    const authStore = useAuthStore();
    authStore.extractStateFromToken();
  }
}