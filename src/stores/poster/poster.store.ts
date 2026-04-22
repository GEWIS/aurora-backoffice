import { defineStore } from 'pinia';
import {
  attachMedia,
  createPoster,
  deletePoster,
  type ExternalPosterRequest,
  forceUpdatePosters,
  getAllPosters,
  getPosterBorrelMode,
  getStaticPosterHandlerState,
  hideStaticPoster,
  type LocalPosterResponse,
  type MediaPosterRequest,
  type PhotoPosterRequest,
  PosterType,
  setPosterBorrelMode,
  setStaticPosterClock,
  showStaticPoster,
  updatePoster,
  type UpdatePosterRequest,
} from '@/api';

interface PosterStore {
  posters: LocalPosterResponse[];
  loading: boolean;
  initialized: boolean;
  static: {
    activePosterId: number | null;
    clockVisible: boolean;
  };
  carousel: {
    borrelModePresent: boolean;
    borrelModeActive: boolean;
  };
}

export const usePosterStore = defineStore('poster', {
  state: (): PosterStore => ({
    posters: [],
    loading: true,
    initialized: false,
    static: {
      activePosterId: null,
      clockVisible: true,
    },
    carousel: {
      borrelModePresent: false,
      borrelModeActive: false,
    },
  }),
  getters: {
    staticPosters: (state) => state.posters.filter((p) => p.type !== PosterType.PHOTO),
  },
  actions: {
    /**
     * Initialize the store
     */
    async init() {
      if (this.initialized) return;

      this.loading = true;
      await Promise.all([this.fetchPosters(false), this.fetchStaticPosterState(), this.fetchBorrelMode()]);
      this.loading = false;

      this.initialized = true;
    },
    /**
     * Load all posters from the server.
     * @param updateLoading
     */
    async fetchPosters(updateLoading = true) {
      if (updateLoading) this.loading = true;
      const res = await getAllPosters();
      if (res.response.ok && res.data) {
        this.posters = res.data;
      }
      if (updateLoading) this.loading = false;
    },
    /**
     * Reload the posters, also forces refresh on the screens.
     */
    async reloadPosters() {
      this.loading = true;
      await forceUpdatePosters();
      this.loading = false;
    },
    /**
     * Create a new poster not based on a file.
     * @param params
     */
    async createPoster(params: ExternalPosterRequest | PhotoPosterRequest) {
      const res = await createPoster({ body: params });
      if (res.response.ok && res.data) {
        this.posters.push(res.data);
      }
    },
    /**
     * Create a new file poster and attach the given file to it.
     * @param params
     * @param file
     */
    async createPosterMedia(params: MediaPosterRequest, file: Blob) {
      const res = await createPoster({ body: params });
      if (res.response.ok && res.data) {
        this.posters.push(res.data);
        const res2 = await attachMedia({
          path: { id: res.data.id },
          body: { file },
        });
        if (res2.response.ok && res2.data) {
          this.posters.push(res.data);
        } else {
          await this.deletePoster(res.data.id);
          //TODO; this should report back that the creation failed.
        }
      }
    },
    /**
     * Delete poster with id on the server and locally.
     * @param id
     */
    async deletePoster(id: number) {
      const res = await deletePoster({ path: { id } });
      if (res.response.ok) {
        const index = this.posters.findIndex((p) => p.id === id);
        this.posters.splice(index, 1);
      }
    },
    /**
     * Update given poster with the new params on the server and store the new version locally.
     * @param id
     * @param params
     */
    async updatePoster(id: number, params: UpdatePosterRequest) {
      const res = await updatePoster({
        path: { id },
        body: params,
      });
      if (res.response.ok && res.data) {
        const index = this.posters.findIndex((p) => p.id === res.data.id);
        this.posters.splice(index, 1, res.data);
      }
    },
    /**
     * Fetch the current activePosterId and clock state for the static poster handler.
     */
    async fetchStaticPosterState() {
      const res = await getStaticPosterHandlerState();
      if (res.response.ok && res.data) {
        this.static.activePosterId = res.data.activePoster?.id ?? null;
        this.static.clockVisible = res.data.clockVisible;
      }
    },
    /**
     * Set active static poster to the poster with given id.
     * @param id
     */
    async setStaticActivePoster(id: number) {
      const res = await showStaticPoster({ path: { id } });
      if (res.response.ok) {
        this.static.activePosterId = id;
      }
    },
    /**
     * Set active static poster to null.
     */
    async clearStaticActivePoster() {
      const res = await hideStaticPoster();
      if (res.response.ok) {
        this.static.activePosterId = null;
      }
    },
    /**
     * Toggle the clock visibility.
     * @param visible
     */
    async setStaticClockVisibility(visible: boolean) {
      const res = await setStaticPosterClock({ body: { visible } });
      if (res.response.ok) {
        this.static.clockVisible = visible;
      }
    },
    /**
     * Fetch status of borrel mode.
     */
    async fetchBorrelMode() {
      const res = await getPosterBorrelMode();
      if (res.response.ok && res.data) {
        this.carousel.borrelModePresent = res.data.present;
        this.carousel.borrelModeActive = res.data.enabled;
      }
    },
    /**
     * Toggle borrel mode.
     * @param enabled
     */
    async setBorrelMode(enabled: boolean) {
      const res = await setPosterBorrelMode({ body: { enabled } });
      if (res.response.ok) {
        this.carousel.borrelModeActive = enabled;
      }
    },
  },
});