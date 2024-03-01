import { Client, ErrorPoster, LocalPoster, MediaPoster, PhotoPoster } from '@/api/Client';
import { defineStore } from 'pinia';
import { handleError } from '@/utils/errorHandler';

interface PosterStore {
  posters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster)[];
  loading: boolean;
}

export const usePosterStore = defineStore('poster', {
  state: (): PosterStore => ({
    posters: [],
    loading: true,
  }),
  getters: {},
  actions: {
    async getPosters() {
      const client = new Client();
      await client.getPosters()
        .then((p) => this.posters = p)
        .catch(handleError);
    },
    async init() {
      this.loading = true;
      await this.getPosters();
      this.loading = false;
    },
    async reloadPosters() {
      this.loading = true;
      await new Client().forceUpdatePosters()
        .catch(handleError);
      await this.getPosters();
      this.loading = false;
    }
  }
});