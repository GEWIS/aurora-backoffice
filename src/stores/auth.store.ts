import { defineStore } from 'pinia';
import { useHandlersStore } from '@/stores/handlers.store';
import { useColorStore } from '@/stores/color.store';
import { useSocketStore } from '@/stores/socket.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { authMock, authOidc, getInformation, type OidcParameters } from '@/api';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { useAuditStore } from '@/stores/audit.store';

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
      getInformation().then(async (user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;

        await useHandlersStore().init();
        await useColorStore().init();
      });
    },
    async OIDCLogin(oidcParameters: OidcParameters): Promise<void> {
      authOidc({
        body: oidcParameters
      }).then((user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;
      });
      await this.initStores();
    },
    async MockLogin(): Promise<void> {
      await authMock().then((user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;
      });
      await this.initStores();
    },
    async initStores(): Promise<void> {
      await useSocketStore().connect();
      await Promise.all([
        useHandlersStore().init(),
        useColorStore().init(),
        useSubscriberStore().init(),
        useSceneControllerStore().init(),
        useAuditStore().init()
      ]);
    },
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    }
  }
});
