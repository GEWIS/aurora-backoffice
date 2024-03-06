import { defineStore } from 'pinia';
import { Client, OIDCParameters, User } from '@/api/Client';
import { useHandlersStore } from '@/stores/handlers.store';
import { useColorStore } from '@/stores/color.store';
import { useSocketStore } from '@/stores/socket.store';
import { useSubscriberStore } from '@/stores/subscriber.store';

interface AuthStore {
  name: string | null;
  roles: string[];
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      name: null,
      roles: []
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
      await new Client().getInformation().then(async (res: User) => {
        this.name = res.name;
        this.roles = res.roles;

        await useHandlersStore().init();
        await useColorStore().init();
      });
    },
    async OIDCLogin(oidcParameters: OIDCParameters, client: Client): Promise<void> {
      await client.authOIDC(oidcParameters).then((res: User) => {
        this.name = res.name;
        this.roles = res.roles;
      });

      await useSocketStore().connect();
      await useHandlersStore().init();
      await useColorStore().init();
      await useSubscriberStore().init();
    },
    async MockLogin(client: Client): Promise<void> {
      await client.authMock(undefined).then((res: User) => {
        this.name = res.name;
        this.roles = res.roles;
      });

      await useSocketStore().connect();
      await useHandlersStore().init();
      await useColorStore().init();
      await useSubscriberStore().init();
    },
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    }
  }
});
