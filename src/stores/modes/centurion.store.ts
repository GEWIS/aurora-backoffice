import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';
import { handleError } from '@/utils/errorHandler';
import {
  type MixTapeResponse,
  ModesService,
  type CenturionResponse,
  type ApiException
} from '@/api';

interface CenturionStore {
  currentTape: CenturionResponse | null;
  loading: boolean;
  tapes: MixTapeResponse[] | null;
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
      // TODO check if error handling is okay
      ModesService.getCenturion()
        .then((tape) => (this.currentTape = tape))
        .catch((e: ApiException | string) => {
          if ((typeof e !== 'string' && e.statusCode === 404) || e === 'Centurion not enabled') {
            this.currentTape = null;
          } else {
            handleError(e as ApiException);
          }
        });
      if (handleLoading) this.loading = false;
    },
    async init() {
      await ModesService.getCenturionTapes().then((t) => (this.tapes = t));

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

      await ModesService.enableCenturion({
        centurionName: tapeName,
        audioIds: audioIds,
        screenIds: screenIds,
        lightsGroupIds: lightsGroupIds
      });
      await this.getCurrentCenturion(false);
      this.loading = false;
    },
    async quitCenturion() {
      this.loading = true;
      await ModesService.disableCenturion();
      this.currentTape = null;
      this.loading = false;
    },
    async startCenturion() {
      await ModesService.startCenturion();
    },
    async pauseCenturion() {
      await ModesService.stopCenturion();
    },
    async skipCenturion(seconds: number) {
      await ModesService.skipCenturion({
        seconds: seconds
      });
    }
  }
});
