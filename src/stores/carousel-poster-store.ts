import { defineStore } from 'pinia';
import { setPosterBorrelMode, forceUpdatePosters, getPosters, type Poster, getPosterBorrelMode } from '@/api';

/**
 * Poster store
 * @param posters - The posters
 * @param borrelModeActive - Whether the borrel mode is active
 * @param loading - Whether the poster store is loading
 */
type CarouselPosterState = {
  posters: Poster[];
  loading: boolean;
  borrelModePresent: boolean;
  borrelModeActive: boolean;
};

export const useCarouselPosterStore = defineStore('carousel-poster', {
  state: (): CarouselPosterState => ({
    posters: [],
    borrelModePresent: false,
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
      getPosters({
        query: { alwaysReturnBorrelPosters: true },
      }).then((posters) => {
        this.posters = posters.data!.posters;
        this.borrelModeActive = posters.data!.borrelMode;
      });
    },
    async getBorrelMode() {
      const res = await getPosterBorrelMode();
      if (res.response.ok && res.data) {
        this.borrelModePresent = res.data.present;
        this.borrelModeActive = res.data.enabled;
      }
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
      await this.getBorrelMode();
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
