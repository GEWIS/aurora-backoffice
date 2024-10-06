import { defineStore } from 'pinia';
import { useHandlersStore } from '@/stores/handlers.store';
import { useColorStore } from '@/stores/color.store';
import { useSocketStore } from '@/stores/socket.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import {
  authMock,
  authOidc,
  type AuthUser,
  getInformation,
  type OidcParameters,
  SecurityGroup
} from '@/api';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { useAuditStore } from '@/stores/audit.store';

/**
 * Auth store
 * @param name - The name of the user
 * @param roles - The roles of the user
 * @param development - Whether in development mode
 */
interface AuthStore {
  name: string | null;
  roles: SecurityGroup[];
  development: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    name: null,
    roles: [],
    development: false
  }),
  getters: {
    getName: (state) => state.name,
    getRoles: (state) => state.roles,
    getDevelopment: (state) => state.development
  },
  actions: {
    /**
     * Initialize the store
     */
    async init(): Promise<void> {
      getInformation().then(async (user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;

        await useHandlersStore().init();
        await useColorStore().init();
      });
    },
    /**
     * Login a user using OIDC
     * @param oidcParameters - The OIDC parameters
     */
    async OIDCLogin(oidcParameters: OidcParameters): Promise<void> {
      authOidc({
        body: oidcParameters
      }).then((user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;
      });
      await this.initStores();
    },
    /**
     * Login a user using any possible data
     * @param user - The user to login as
     */
    async MockLogin(user: AuthUser): Promise<void> {
      this.development = true;
      await authMock({
        body: user
      }).then((user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;
      });
    },
    /**
     * Initialize the stores
     */
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
    /**
     * Check if the user is authenticated
     */
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    }
  }
});
