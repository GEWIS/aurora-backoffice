import { defineStore } from 'pinia';
import _ from 'lodash';
import { useHandlersStore } from '@/stores/handlers.store';
import { useColorStore } from '@/stores/color.store';
import { useSocketStore } from '@/stores/socket.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import {
  authMock,
  authOidc,
  type AuthUser,
  getInformation,
  getSecurityGroups,
  type ISecurityGroups,
  type ISecuritySections,
  type OidcParameters,
  SecurityGroup,
} from '@/api';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { useAuditStore } from '@/stores/audit.store';
import { useServerSettingsStore } from '@/stores/server-settings.store';

/**
 * Auth store
 * @param name - The name of the user
 * @param roles - The roles of the user
 * @param development - Whether in development mode
 * @param securityGroups - The security groups
 */
interface AuthStore {
  name: string | null;
  roles: SecurityGroup[];
  development: boolean;
  securityGroups?: ISecurityGroups;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => ({
    name: null,
    roles: [],
    development: false,
    securityGroups: undefined,
  }),
  getters: {
    getName: (state) => state.name,
    getRoles: (state) => state.roles,
    getDevelopment: (state) => state.development,
    getSecurityGroups: (state) => state.securityGroups,
  },
  actions: {
    /**
     * Initialize the store
     */
    async init(): Promise<void> {
      void getInformation().then(async (user) => {
        if (user.data) {
          this.name = user.data.name;
          this.roles = user.data.roles;

          await useHandlersStore().init();
          await useColorStore().init();
        }
      });

      const securityGroups = await getSecurityGroups();
      this.securityGroups = securityGroups.data;
    },
    /**
     * Login a user using OIDC
     * @param oidcParameters - The OIDC parameters
     */
    async OIDCLogin(oidcParameters: OidcParameters): Promise<void> {
      const res = await authOidc({
        body: oidcParameters,
      });
      if (res.response.ok && res.data) {
        this.name = res.data.name;
        this.roles = res.data.roles;
      }
      await this.initStores();
    },
    /**
     * Login a user using any possible data
     * @param user - The user to login as
     */
    async MockLogin(user: AuthUser): Promise<void> {
      this.development = true;
      await authMock({
        body: user,
      }).then((user) => {
        this.name = user.data!.name;
        this.roles = user.data!.roles;
      });
    },
    /**
     * Initialize the stores -- only those which the user has access to
     */
    async initStores(): Promise<void> {
      await useServerSettingsStore().initFeatureFlags();
      await useSocketStore().connect();
      if (this.isInSecurityGroup('serverSettings', 'privileged')) {
        await useServerSettingsStore().initSettings();
      }
      if (this.isInSecurityGroup('handler', 'base')) {
        await useHandlersStore().init();
      }
      if (this.isInSecurityGroup('light', 'base')) {
        await useColorStore().init();
      }
      if (
        this.isInSecurityGroup('audio', 'base') &&
        this.isInSecurityGroup('light', 'base') &&
        this.isInSecurityGroup('screen', 'base')
      ) {
        await useSubscriberStore().init();
      }
      if (this.isInSecurityGroup('scenes', 'base')) {
        await useSceneControllerStore().init();
      }
      if (this.isInSecurityGroup('audit', 'base')) {
        await useAuditStore().init();
      }
    },
    /**
     * Check if the user is authenticated
     */
    isAuthenticated(): boolean {
      return this.name !== undefined && this.roles.length > 0;
    },
    /**
     * Check if the user is in a security group
     * @param group - The endpoint for the security
     * @param section - The security group to check for
     */
    isInSecurityGroup(group: keyof ISecurityGroups, section: keyof ISecuritySections): boolean {
      if (!this.securityGroups) return false;
      return _.intersection(this.roles, this.securityGroups[group][section]).length > 0;
    },
  },
});
