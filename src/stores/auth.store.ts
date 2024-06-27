import { defineStore } from 'pinia';
import { useHandlersStore } from '@/stores/handlers.store';
import { useColorStore } from '@/stores/color.store';
import { useSocketStore } from '@/stores/socket.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useInfoscreenStore } from '@/stores/infoscreen.store';
import { AuthenticationService, type OidcParameters, type User, UserService } from '@/api';
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
      UserService.getInformation().then(async (res: User) => {
        this.name = res.name;
        this.roles = res.roles;

        await useHandlersStore().init();
        await useColorStore().init();
      });
    },
    async OIDCLogin(oidcParameters: OidcParameters): Promise<void> {
      await AuthenticationService.authOidc(oidcParameters).then((res: User) => {
        this.name = res.name;
        this.roles = res.roles;
      });
      await this.initStores();
    },
    async MockLogin(): Promise<void> {
      await AuthenticationService.authMock(undefined).then((res: User) => {
        this.name = res.name;
        this.roles = res.roles;
      });
      await this.initStores();
    },
    async initStores(): Promise<void> {
      await useSocketStore().connect();
      await Promise.all([
        useHandlersStore().init(),
        useColorStore().init(),
        useSubscriberStore().init(),
        useInfoscreenStore().init(),
        useSceneControllerStore().init(),
        useAuditStore().init()
      ]);
    },
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    }
  }
});
