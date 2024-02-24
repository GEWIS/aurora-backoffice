import type { MixTapeResponse } from '@/api/Client';
import { defineStore } from 'pinia';
import { ApiException, CenturionParams, CenturionResponse, Client, SkipCenturionRequest } from '@/api/Client';
import { handleError } from '@/utils/errorHandler';
import { useSocketStore } from '@/stores/socket.store';

interface CenturionStore {
  currentTape: CenturionResponse | null;
  tapes: MixTapeResponse[] | null;
  loading: boolean,
}

export const useCenturionStore = defineStore('centurion', {
  state: (): CenturionStore => ({
    currentTape: null,
    tapes: null,
    loading: true,
  }),
  getters: {},
  actions: {
    async getCurrentCenturion(handleLoading = true) {
      if (handleLoading) this.loading = true;
      this.currentTape = await new Client().getCenturion()
        .catch((e: ApiException | string) => {
          if (e.status === 404 || e === "Centurion not enabled") {
            this.currentTape = null;
          } else {
            handleError(e);
          }
        });
      if (handleLoading) this.loading = false;
    },
    async init() {
      const client = new Client();
      this.tapes = await client.getCenturionTapes().catch(handleError);
      await this.getCurrentCenturion(false);
      this.loading = false;

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('mode_centurion_update', this.getCurrentCenturion.bind(this));
    },
    async destroy() {
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.removeListener('mode_centurion_update', this.getCurrentCenturion.bind(this));
    },
    async initializeCenturion(tapeName: string) {
      this.loading = true;
      const body = new CenturionParams();
      body.centurionName = tapeName;
      const client = new Client();
      await client.enableCenturion(body).catch(handleError);
      this.currentTape = await client.getCenturion().catch(handleError);
      this.loading = false;
    },
    async quitCenturion() {
      this.loading = true;
      await new Client().disableCenturion().catch(handleError);
      this.currentTape = null;
      this.loading = false;
    },
    async startCenturion() {
      await new Client().startCenturion().catch(handleError);
    },
    async pauseCenturion() {
      await new Client().stopCenturion().catch(handleError);
    },
    async skipCenturion(seconds: number) {
      const body = new SkipCenturionRequest();
      body.seconds = seconds;
      await new Client().skipCenturion(body);
    }
  }
});
