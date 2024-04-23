import { defineStore } from 'pinia';
import { handleError } from '@/utils/errorHandler';

import { useSocketStore } from '@/stores/socket.store';
import {
  type AudioResponse,
  type HandlerResponse_AudioResponse_,
  type HandlerResponse_LightsGroupResponse_,
  type HandlerResponse_ScreenResponse_,
  HandlersService,
  type LightsGroupResponse,
  type ScreenResponse
} from '@/api';

export type Handler =
  | HandlerResponse_ScreenResponse_
  | HandlerResponse_AudioResponse_
  | HandlerResponse_LightsGroupResponse_;

interface HandlersStore {
  audioHandlers: HandlerResponse_AudioResponse_[];
  lightsHandlers: HandlerResponse_LightsGroupResponse_[];
  screenHandlers: HandlerResponse_ScreenResponse_[];
  loading: boolean;
}

export const useHandlersStore = defineStore('handlers', {
  state: (): HandlersStore =>
    ({
      audioHandlers: [],
      lightsHandlers: [],
      screenHandlers: [],
      loading: true
    }) as HandlersStore,
  getters: {},
  actions: {
    async getAudioHandlers() {
      this.loading = true;
      await HandlersService.getAudioHandlers().then((handlers) => (this.audioHandlers = handlers));

      this.loading = false;
    },
    async getLightsHandlers() {
      this.loading = true;
      await HandlersService.getLightsHandlers().then(
        (handlers) => (this.lightsHandlers = handlers)
      );

      this.loading = false;
    },
    async getScreenHandlers() {
      this.loading = true;
      await HandlersService.getScreenHandlers().then(
        (handlers) => (this.screenHandlers = handlers)
      );

      this.loading = false;
    },
    async init(): Promise<void> {
      await this.getAudioHandlers();
      await this.getLightsHandlers();
      await this.getScreenHandlers();

      const socketStore = useSocketStore();
      socketStore.backofficeSocket?.on('handler_audio_update', this.getAudioHandlers.bind(this));
      socketStore.backofficeSocket?.on('handler_screen_update', this.getScreenHandlers.bind(this));
      socketStore.backofficeSocket?.on(
        'handler_lightsgroup_update',
        this.getLightsHandlers.bind(this)
      );

      this.loading = false;
    },
    async setAudioHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        await HandlersService.setAudioHandler({
          id: id,
          requestBody: {
            name: newHandler != null ? newHandler : ''
          }
        });

        this.audioHandlers = await HandlersService.getAudioHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.loading = false;
    },
    async setLightsHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        await HandlersService.setLightsHandler({
          id: id,
          requestBody: {
            name: newHandler != null ? newHandler : ''
          }
        });

        this.lightsHandlers = await HandlersService.getLightsHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.loading = false;
    },
    async setScreenHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        await HandlersService.setScreenHandler({
          id: id,
          requestBody: {
            name: newHandler != null ? newHandler : ''
          }
        });

        this.screenHandlers = await HandlersService.getScreenHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.loading = false;
    },
    getRegisteredAudios(handlerName?: string): AudioResponse[] {
      if (!handlerName) return this.audioHandlers.map((h) => h.entities).flat();
      const handler = this.audioHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    },
    getRegisteredLights(handlerName?: string): LightsGroupResponse[] {
      if (!handlerName) return this.lightsHandlers.map((h) => h.entities).flat();
      const handler = this.lightsHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    },
    getRegisteredScreens(handlerName?: string): ScreenResponse[] {
      if (!handlerName) return this.screenHandlers.map((h) => h.entities).flat();
      const handler = this.screenHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    }
  }
});
