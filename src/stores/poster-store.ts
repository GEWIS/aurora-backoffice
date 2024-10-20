import { defineStore } from 'pinia';
import {
  type LocalPoster,
  type MediaPoster,
  type PhotoPoster,
  type ErrorPoster,
  getPosters,
  setPosterBorrelMode,
  forceUpdatePosters
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
      getPosters({
        query: { alwaysReturnBorrelPosters: true }
      }).then((posters) => {
        this.posters = posters.data!.posters;
        this.borrelModeActive = posters.data!.borrelMode;
      });
    },
    async setBorrelMode(enabled: boolean) {
      this.loading = true;
      await setPosterBorrelMode({
        body: { enabled }
      }).then(() => {
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
      await forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    }
  }
});
