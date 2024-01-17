import { defineStore } from 'pinia';
import { Client, OIDCParameters } from "@/api/Client";
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
    getRoles(): string[] {
      return this.roles;
    }
  },
  actions: {
    init(): void {
      // if (document.cookie)
      // this.name = 'mock';
      // this.roles = ['PRIV - Narrowcasting Test Admin'];
    },
    async OIDCLogin(oidcParameters: OIDCParameters, client: Client): Promise<void> {
      await client.authOIDC(oidcParameters)
        .then(() => {
          // console.log(document.cookie)
          // const decoded = jwtDecode<AuthStoreToken>(oidcToken!);
          // setTokenInStorage(oidcToken!);

          // this.token = oidcToken!;
          this.name = 'mock';
          this.roles = ['PRIV - Narrowcasting Test Admin'];
        });
    },
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles !== undefined;
    }
  },
});