import { defineStore } from 'pinia';
import { Client, OIDCParameters, OIDCResponse } from "@/api/Client";
import { type AuthStoreToken, clearTokenInStorage, getTokenFromStorage, setTokenInStorage } from "@/utils/tokenUtil";
import jwtDecode from "jwt-decode";

interface AuthStore {
  name: string | null,
  roles: string[],
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: null,
    roles: [],
    token: null
  }) as AuthStore,
  getters: {
    getName(): string | null {
      return this.name;
    },
    getToken(): string | null {
      return this.token;
    },
    getRoles(): string[] {
      return this.roles;
    }
  },
  actions: {
    async OIDCLogin(oidcParameters: OIDCParameters, client: Client): Promise<void> {
      await client.authOIDC(oidcParameters)
        .then((res: OIDCResponse) => {
          const { id_token: oidcToken } = res;
          const decoded = jwtDecode<AuthStoreToken>(oidcToken!);
          setTokenInStorage(oidcToken!);

          this.token = oidcToken!;
          this.name = decoded.given_name;
          this.roles = decoded.resource_access ? decoded.resource_access["narrowcasting-test"].roles : [];
        });
    },
    extractStateFromToken() {
      const token = getTokenFromStorage();
      if (!token) return;
      // If ever for some reason the stored token is invalid, return
      let decoded: AuthStoreToken;
      try {
        decoded = jwtDecode<AuthStoreToken>(token);
      } catch (e) {
        console.warn(e);
        clearTokenInStorage();
        return;
      }
      this.token = token;
      this.name = decoded.given_name;
      this.roles = decoded.resource_access ? decoded.resource_access["narrowcasting-test"].roles : [];
    },
    logout() {
      this.name = null;
      this.roles = [];
      this.token = null;
      clearTokenInStorage();
    }
  },
});