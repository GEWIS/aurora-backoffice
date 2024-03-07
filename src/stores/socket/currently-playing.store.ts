import { defineStore } from 'pinia';
import { useSocketStore } from '@/stores/socket.store';
import { SpotifyService, type TrackChangeEvent } from '@/api';

interface CurrentlyPlayingStore {
  currentlyPlaying: TrackChangeEvent | null;
  initialized: boolean;
}

export const useCurrentlyPlayingStore = defineStore('currently-playing', {
  state: (): CurrentlyPlayingStore => ({
    currentlyPlaying: null,
    initialized: false
  }),
  getters: {},
  actions: {
    handleChangeTrack(events: TrackChangeEvent[]) {
      console.log('change track', events);
      this.currentlyPlaying = events[0];
    },
    async init() {
      if (this.initialized) return;

      const store = useSocketStore();
      if (!store.backofficeSocket) return;

      store.backofficeSocket.on('change_track', this.handleChangeTrack.bind(this));

      const event = await SpotifyService.getSpotifyCurrentlyPlaying();
      this.handleChangeTrack([event]);
    },
    destroy() {
      const store = useSocketStore();
      if (!store.backofficeSocket) return;

      store.backofficeSocket.removeListener('beat', this.handleChangeTrack.bind(this));
    }
  }
});
