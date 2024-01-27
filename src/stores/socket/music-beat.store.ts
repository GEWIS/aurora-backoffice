import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';

interface MusicBeatStore {
  beat: boolean;
}

export const useMusicBeatStore = defineStore('music-beat', {
  state: (): MusicBeatStore => ({
    beat: false,
  }),
  getters: {},
  actions: {
    handleBeat() {
      console.log('beat');
      this.beat = !this.beat;
    },
    init() {
      const store = useSocketStore();
      console.log('init beats');
      if (!store.backofficeSocket) return;
      console.log('init beats - socket exists');

      store.backofficeSocket.on('beat', this.handleBeat);
    },
    destroy() {
      const store = useSocketStore();
      if (!store.backofficeSocket) return;

      store.backofficeSocket.removeListener('beat', this.handleBeat);
    },
  }
});
