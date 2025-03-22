import { defineStore } from 'pinia';
import {
  createStaticPosterUrl,
  createStaticPosterFile,
  deleteStaticPoster,
  getAllStaticPosters,
  getStaticPosterHandlerState,
  type LocalPosterResponse,
  setStaticPosterClock,
  showStaticPoster,
  hideStaticPoster,
} from '@/api';

interface StaticPosterStore {
  staticPosters: LocalPosterResponse[];
  activePosterId: number | null;
  loading: boolean;
  clockVisible: boolean;
  initialized: boolean;
}

export const useStaticPosterStore = defineStore('static-poster', {
  state: (): StaticPosterStore => ({
    staticPosters: [],
    activePosterId: null,
    loading: true,
    clockVisible: true,
    initialized: false,
  }),
  getters: {},
  actions: {
    async init() {
      if (this.initialized) return;

      this.loading = true;
      await Promise.all([this.fetchState(false), this.fetchPosters(false)]);
      this.loading = false;

      this.initialized = true;
    },
    async fetchState(updateLoading = true) {
      if (updateLoading) this.loading = true;
      const res = await getStaticPosterHandlerState();
      if (res.response.ok && res.data) {
        this.activePosterId = res.data.activePoster?.id ?? null;
        this.clockVisible = res.data.clockVisible;
      }
      if (updateLoading) this.loading = false;
    },
    async fetchPosters(updateLoading = true) {
      if (updateLoading) this.loading = true;
      const res = await getAllStaticPosters();
      if (res.response.ok && res.data) {
        this.staticPosters = res.data;
      }
      if (updateLoading) this.loading = false;
    },
    async addPosterFile(file: Blob) {
      const res = await createStaticPosterFile({ body: { file } });
      if (res.response.ok && res.data) {
        this.staticPosters.push(res.data);
      }
    },
    async addPosterUrl(url: string) {
      const res = await createStaticPosterUrl({ body: { url } });
      if (res.response.ok && res.data) {
        this.staticPosters.push(res.data);
      }
    },
    async deletePoster(id: number) {
      const res = await deleteStaticPoster({ path: { id } });
      if (res.response.ok) {
        const index = this.staticPosters.findIndex((p) => p.id === id);
        this.staticPosters.splice(index, 1);
      }
    },
    async setActivePoster(id: number) {
      const res = await showStaticPoster({ path: { id } });
      if (res.response.ok) {
        this.activePosterId = id;
      }
    },
    async setClockVisibility(visible: boolean) {
      const res = await setStaticPosterClock({ body: { visible } });
      if (res.response.ok) {
        this.clockVisible = visible;
      }
    },
    async clearActivePoster() {
      await hideStaticPoster();
    },
  },
});
