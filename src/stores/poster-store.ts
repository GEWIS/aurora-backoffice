import { defineStore } from 'pinia';
import {
  type LocalPoster,
  type MediaPoster,
  type PhotoPoster,
  type ErrorPoster,
  HandlersService
} from '@/api';

interface PosterStore {
  posters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster)[];
  borrelModeActive: boolean;
  loading: boolean;
}

export const usePosterStore = defineStore('poster', {
  state: (): PosterStore => ({
    posters: [],
    borrelModeActive: false,
    loading: true
  }),
  getters: {},
  actions: {
    async getPosters() {
      await HandlersService.getPosters(true).then((p) => {
        this.posters = p.posters;
        this.borrelModeActive = p.borrelMode;
      });
    },
    async setBorrelMode(enabled: boolean) {
      this.loading = true;
      await HandlersService.setPosterBorrelMode({ enabled }).then(() => {
        this.loading = false;
        this.borrelModeActive = enabled;
      });
    },
    async init() {
      this.loading = true;
      await this.getPosters();
      this.loading = false;
    },
    async reloadPosters() {
      this.loading = true;
      await HandlersService.forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    }
  }
});
