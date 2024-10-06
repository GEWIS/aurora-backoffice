import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';
import { handleError } from '@/utils/errorHandler';
import {
  type MixTapeResponse,
  type CenturionResponse,
  type HttpApiException,
  getCenturion,
  getCenturionTapes,
  enableCenturion,
  disableCenturion,
  startCenturion,
  stopCenturion,
  skipCenturion
} from '@/api';

interface CenturionStore {
  currentTape: CenturionResponse | null;
  loading: boolean;
  tapes: MixTapeResponse[] | null;
  playing: boolean;
  skipping: boolean;
}

export const useCenturionStore = defineStore('centurion', {
  state: (): CenturionStore => ({
    currentTape: null,
    tapes: null,
    loading: true,
    playing: false,
    skipping: false
  }),
  getters: {
    enabled(): boolean {
      return this.currentTape != null && !this.loading;
    },
    disabled(): boolean {
      return this.currentTape == null && !this.loading;
    }
  },
  actions: {
    async getCurrentCenturion(handleLoading = true) {
      if (handleLoading) this.loading = true;
      // TODO check if error handling is okay
      getCenturion()
        .then((tape) => (this.currentTape = tape.data!))
        .catch((e: HttpApiException | string) => {
          if ((typeof e !== 'string' && e.statusCode === 404) || e === 'Centurion not enabled') {
            this.currentTape = null;
          } else if (typeof e !== 'string') {
            handleError(e);
          }
        });
      if (handleLoading) this.loading = false;
    },
    async init() {
      await getCenturionTapes().then((tapes) => (this.tapes = tapes.data!));

      await this.getCurrentCenturion(false);
      this.loading = false;
      console.log(this.currentTape);
      this.playing = this.currentTape?.playing ?? false;

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

      await enableCenturion({
        body: {
          centurionName: tapeName,
          audioIds: audioIds,
          screenIds: screenIds,
          lightsGroupIds: lightsGroupIds
        }
      });
      await this.getCurrentCenturion(false);
      this.loading = false;
      this.playing = false;
    },
    async quitCenturion() {
      this.loading = true;
      await disableCenturion();
      this.currentTape = null;
      this.loading = false;
    },
    async startCenturion() {
      await startCenturion();
      this.playing = true;
    },
    async pauseCenturion() {
      await stopCenturion();
      this.playing = false;
    },
    async skipCenturion(seconds: number) {
      this.skipping = true;
      await skipCenturion({
        body: {
          seconds: seconds
        }
      });
      this.skipping = false;
    }
  }
});
