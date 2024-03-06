import { Client, ErrorPoster, LocalPoster, MediaPoster, PhotoPoster, Poster } from '@/api/Client';
import { defineStore } from 'pinia';

interface PosterStore {
  posters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster | Poster)[];
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
      const client = new Client();
      await client.getPosters().then((p) => (this.posters = p));
    },
    async init() {
      this.loading = true;
      await this.getPosters();
      this.loading = false;
    },
    async reloadPosters() {
      this.loading = true;
      await new Client().forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    }
  }
});
