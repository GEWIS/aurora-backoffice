import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';

interface MusicBeatStore {
  beat: boolean;
  initialized: boolean;
}

export const useMusicBeatStore = defineStore('music-beat', {
  state: (): MusicBeatStore => ({
    beat: false,
    initialized: false,
  }),
  getters: {},
  actions: {
    handleBeat() {
      this.beat = !this.beat;
    },
    init() {
      if (this.initialized) return;

      const store = useSocketStore();
      if (!store.backofficeSocket) return;

      store.backofficeSocket.on('beat', this.handleBeat.bind(this));
      this.initialized = true;
    },
    destroy() {
      const store = useSocketStore();
      if (!store.backofficeSocket) return;

      store.backofficeSocket.removeListener('beat', this.handleBeat.bind(this));
      this.initialized = false;
    },
  },
});
