import { io, Socket } from 'socket.io-client';
import { defineStore } from 'pinia';

interface SocketStore {
  rootSocket?: Socket;
  backofficeSocket?: Socket;
}

export const useSocketStore = defineStore('socket', {
  state: (): SocketStore => ({
    rootSocket: undefined,
    backofficeSocket: undefined
  }),
  getters: {},
  actions: {
    async connect() {
      const rootSocket = io('/', { path: '/socket.io/' });
      const backofficeSocket = io('/backoffice', { path: '/socket.io/' });

      const promise1 = new Promise<void>((resolve) => {
        rootSocket.on('connect', () => {
          console.log('SocketIO: connected to /');
          this.rootSocket = rootSocket;
          resolve();
        });
      });
      const promise2 = new Promise<void>((resolve) => {
        backofficeSocket.on('connect', () => {
          console.log('SocketIO: connected to /backoffice');
          this.backofficeSocket = backofficeSocket;
          resolve();
        });
      });
      return Promise.all([promise1, promise2]);
    }
  }
});
