import { defineStore } from 'pinia';
import type { AudioResponse } from '@/api/Client';
import { Client, LightsGroupResponse, ScreenResponse } from '@/api/Client';
import { handleError } from '@/utils/errorHandler';

interface SubscriberStore {
  audios: AudioResponse[];
  lightsGroups: LightsGroupResponse[];
  screens: ScreenResponse[];
}

export const useSubscriberStore = defineStore('subscribers', {
  state: (): SubscriberStore => ({
    audios: [],
    lightsGroups: [],
    screens: [],
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      const client = new Client();
      await Promise.all([
        client.getAudios()
          .then((a) => this.audios = a)
          .catch(handleError),
        client.getLightsGroups()
          .then((g) => this.lightsGroups = g)
          .catch(handleError),
        client.getScreens()
          .then((s) => this.screens = s)
          .catch(handleError),
      ]);
    }
  }
});
