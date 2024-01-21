import { defineStore } from 'pinia';
import { Client, OIDCParameters, User } from '@/api/Client';

interface AuthStore {
  name: string | null,
  roles: string[],
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    name: null,
    roles: [],
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
    async init(): Promise<void> {
      await (new Client()).getInformation()
        .then((res: User) => {
          this.name = res.name;
          this.roles = res.roles;
        })
        .catch(() => {
          console.log("User not yet logged in. Redirecting.");
        });
    },
    async OIDCLogin(oidcParameters: OIDCParameters, client: Client): Promise<void> {
      await client.authOIDC(oidcParameters)
        .then((res: User) => {
          this.name = res.name;
          this.roles = res.roles;
        });
    },
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    }
  },
});