import type { MixTapeResponse } from '@/api/Client';
import { defineStore } from 'pinia';
import {
  ApiException,
  CenturionParams,
  CenturionResponse,
  Client,
  SkipCenturionRequest
} from '@/api/Client';

import { useSocketStore } from '@/stores/socket.store';
import { handleError } from '@/utils/errorHandler';

interface CenturionStore {
  currentTape: CenturionResponse | null;
  tapes: MixTapeResponse[] | null;
  loading: boolean;
}

export const useCenturionStore = defineStore('centurion', {
  state: (): CenturionStore => ({
    currentTape: null,
    tapes: null,
    loading: true
  }),
  getters: {},
  actions: {
    async getCurrentCenturion(handleLoading = true) {
      if (handleLoading) this.loading = true;
      await new Client()
        .getCenturion()
        .then((tape) => (this.currentTape = tape))
        .catch((e: ApiException | string) => {
          if ((typeof e !== 'string' && e.status === 404) || e === 'Centurion not enabled') {
            this.currentTape = null;
          } else {
            handleError(e as ApiException);
          }
        });
      if (handleLoading) this.loading = false;
    },
    async init() {
      const client = new Client();
      await client.getCenturionTapes().then((t) => (this.tapes = t));

      await this.getCurrentCenturion(false);
      this.loading = false;

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on(
        'mode_centurion_update',
        this.getCurrentCenturion.bind(this)
      );
    },
    async destroy() {
      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.removeListener(
        'mode_centurion_update',
        this.getCurrentCenturion.bind(this)
      );
    },
    async initializeCenturion(
      tapeName: string,
      audioIds: number[],
      screenIds: number[],
      lightsGroupIds: number[]
    ) {
      this.loading = true;

      const body = new CenturionParams();
      body.centurionName = tapeName;
      body.audioIds = audioIds;
      body.screenIds = screenIds;
      body.lightsGroupIds = lightsGroupIds;

      const client = new Client();
      await client.enableCenturion(body);
      await this.getCurrentCenturion(false);
      this.loading = false;
    },
    async quitCenturion() {
      this.loading = true;
      await new Client().disableCenturion();
      this.currentTape = null;
      this.loading = false;
    },
    async startCenturion() {
      await new Client().startCenturion();
    },
    async pauseCenturion() {
      await new Client().stopCenturion();
    },
    async skipCenturion(seconds: number) {
      const body = new SkipCenturionRequest();
      body.seconds = seconds;
      await new Client().skipCenturion(body);
    }
  }
});
