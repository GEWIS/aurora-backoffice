import { defineStore } from 'pinia';

import { useSocketStore } from '@/stores/socket.store';
import {
  type AudioResponse,
  getAudios,
  getLightsGroups,
  getScreens,
  type LightsGroupResponse,
  type ScreenResponse,
} from '@/api';

interface SubscriberStore {
  audios: AudioResponse[];
  screens: ScreenResponse[];
  lightsGroups: LightsGroupResponse[];
}

export const useSubscriberStore = defineStore('subscribers', {
  state: (): SubscriberStore => ({
    audios: [],
    screens: [],
    lightsGroups: [],
  }),
  getters: {},
  actions: {
    async getAudios() {
      await getAudios().then((audios) => (this.audios = audios.data!));
    },
    async getScreens() {
      await getScreens().then((screens) => (this.screens = screens.data!));
    },
    async getLightGroups() {
      await getLightsGroups().then((lightsGroups) => (this.lightsGroups = lightsGroups.data!));
    },
    async init(): Promise<void> {
      await Promise.all([this.getAudios(), this.getScreens(), this.getLightGroups()]);

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('connect_audio', this.getAudios.bind(this));
      socketStore.backofficeSocket?.on('connect_screen', this.getScreens.bind(this));
      socketStore.backofficeSocket?.on('connect_lightgroups', this.getLightGroups.bind(this));
    },
  },
});
