import { defineStore } from 'pinia';
import type { AudioResponse } from '@/api/Client';
import { Client, LightsGroupResponse, ScreenResponse } from '@/api/Client';

import { useSocketStore } from '@/stores/socket.store';

interface SubscriberStore {
  audios: AudioResponse[];
  screens: ScreenResponse[];
  lightsGroups: LightsGroupResponse[];
}

export const useSubscriberStore = defineStore('subscribers', {
  state: (): SubscriberStore => ({
    audios: [],
    screens: [],
    lightsGroups: []
  }),
  getters: {},
  actions: {
    async getAudios() {
      await new Client().getAudios().then((a) => (this.audios = a));
    },
    async getScreens() {
      await new Client().getScreens().then((s) => (this.screens = s));
    },
    async getLightGroups() {
      await new Client().getLightsGroups().then((g) => (this.lightsGroups = g));
    },
    async init(): Promise<void> {
      await Promise.all([this.getAudios(), this.getScreens(), this.getLightGroups()]);

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('connect_audio', this.getAudios.bind(this));
      socketStore.backofficeSocket?.on('connect_screen', this.getScreens.bind(this));
      socketStore.backofficeSocket?.on('connect_lightgroups', this.getLightGroups.bind(this));
    }
  }
});
