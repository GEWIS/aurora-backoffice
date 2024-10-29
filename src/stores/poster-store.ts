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

/**
 * Poster store
 * @param posters - The posters
 * @param borrelModeActive - Whether the borrel mode is active
 * @param loading - Whether the poster store is loading
 */
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
  getters: {
    fetchPosters: (state) => state.posters,
    isLoading: (state) => state.loading,
    isBorrelModeActive: (state) => state.borrelModeActive
  },
  actions: {
    /**
     * Get the posters
     */
    async getPosters() {
      getPosters({
        query: { alwaysReturnBorrelPosters: true }
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
        body: { enabled }
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
      await forceUpdatePosters();

      await this.getPosters();
      this.loading = false;
    }
  }
});
