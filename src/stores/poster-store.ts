import { defineStore } from 'pinia';
import {
  PosterScreenService,
  type LocalPoster,
  type MediaPoster,
  type PhotoPoster,
  type ErrorPoster
} from '@/api';

interface PosterStore {
  posters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster)[];
  loading: boolean;
}

export const usePosterStore = defineStore('poster', {
  state: (): PosterStore => ({
    posters: [],
    loading: true
  }),
  getters: {},
  actions: {
    async getPosters() {
      await PosterScreenService.getPosters().then((p) => (this.posters = p));
    },
    async init() {
      this.loading = true;
      await this.getPosters();
      this.loading = false;
    },
    async reloadPosters() {
      this.loading = true;
      await PosterScreenService.forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    }
  }
});
