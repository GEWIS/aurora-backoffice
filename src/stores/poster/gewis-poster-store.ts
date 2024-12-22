import { defineStore } from 'pinia';
import { getGewisPosters, setPosterBorrelMode, forceUpdateGewisPosters } from '@/api';
import { type BasePosterState } from '@/stores/poster/base-poster-store';

/**
 * Poster store
 * @param posters - The posters
 * @param borrelModeActive - Whether the borrel mode is active
 * @param loading - Whether the poster store is loading
 */
type GewisPosterState = BasePosterState & {
  borrelModeActive: boolean;
};

export const useGewisPosterStore = defineStore('gewis-poster', {
  state: (): GewisPosterState => ({
    posters: [],
    borrelModeActive: false,
    loading: true,
  }),
  getters: {
    fetchPosters: (state) => state.posters,
    isLoading: (state) => state.loading,
    isBorrelModeActive: (state) => state.borrelModeActive,
  },
  actions: {
    /**
     * Get the posters
     */
    async getPosters() {
      getGewisPosters({
        query: { alwaysReturnBorrelPosters: true },
      }).then((posters) => {
        this.posters = posters.data!.posters;
        this.borrelModeActive = posters.data!.borrelMode;
      });
    },
    /**
     * Set the borrel mode
     * @param enabled - Whether to enable or disable the borrel mode
     */
    async setBorrelMode(enabled: boolean) {
      this.loading = true;
      await setPosterBorrelMode({
        body: { enabled },
      }).then(() => {
        this.loading = false;
        this.borrelModeActive = enabled;
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
      await forceUpdateGewisPosters();

      await this.getPosters();
      this.loading = false;
    },
  },
});
