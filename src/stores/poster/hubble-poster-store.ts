import { defineStore } from 'pinia';
import { forceUpdatePosters, getPosters } from '@/api';
import { type BasePosterState } from '@/stores/poster/base-poster-store';

export const useHubblePosterStore = defineStore('poster', {
  state: (): BasePosterState => ({
    posters: [],
    loading: true,
  }),
  getters: {
    fetchPosters: (state) => state.posters,
    isLoading: (state) => state.loading,
  },
  actions: {
    /**
     * Get the posters
     */
    async getPosters() {
      getPosters().then((posters) => {
        this.posters = posters.data!.posters;
      });
    },
    /**
     * Initialize the store
     */
    async init() {
      this.loading = true;
      await this.getPosters();
      this.loading = false;
    },
    /**
     * Reload the posters
     */
    async reloadPosters() {
      this.loading = true;
      await forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    },
  },
});
