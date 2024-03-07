import { defineStore } from 'pinia';

import { useSocketStore } from '@/stores/socket.store';
import {
  type AudioResponse,
  AudiosService,
  type LightsGroupResponse,
  LightsService,
  type ScreenResponse,
  ScreensService
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
    lightsGroups: []
  }),
  getters: {},
  actions: {
    async getAudios() {
      await AudiosService.getAudios().then((a) => (this.audios = a));
    },
    async getScreens() {
      await ScreensService.getScreens().then((s) => (this.screens = s));
    },
    async getLightGroups() {
      await LightsService.getLightsGroups().then((g) => (this.lightsGroups = g));
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
