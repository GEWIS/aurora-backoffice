import { defineStore } from 'pinia';
import {
  AudioResponse,
  Client,
  HandlerResponse_AudioResponse_,
  HandlerResponse_LightsGroupResponse_,
  HandlerResponse_ScreenResponse_,
  LightsGroupResponse, NewHandlerParams, ScreenResponse
} from '@/api/Client';
import { handleError } from '@/utils/errorHandler';

export type Handler = HandlerResponse_ScreenResponse_
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
      loading: true,
    }) as HandlersStore,
  getters: {},
  actions: {
    async init(): Promise<void> {
      const client = new Client();
      await client
        .getAudioHandlers()
        .then((handlers) => (this.audioHandlers = handlers))
        .catch(handleError);
      await client
        .getLightsHandlers()
        .then((handlers) => (this.lightsHandlers = handlers))
        .catch(handleError);
      await client
        .getScreenHandlers()
        .then((handlers) => (this.screenHandlers = handlers))
        .catch(handleError);
      this.loading = false;
    },
    async setAudioHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        const client = new Client();
        const params = new NewHandlerParams();
        params.name = newHandler != null ? newHandler : '';
        await client.setAudioHandler(id, params);

        this.audioHandlers = await client.getAudioHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.loading = false;
    },
    async setLightsHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        const client = new Client();
        const params = new NewHandlerParams();
        params.name = newHandler != null ? newHandler : '';
        await client.setLightsHandler(id, params);

        this.lightsHandlers = await client.getLightsHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.loading = false;
    },
    async setScreenHandler(id: number, newHandler: string | null): Promise<void> {
      try {
        this.loading = true;

        const client = new Client();
        const params = new NewHandlerParams();
        params.name = newHandler != null ? newHandler : '';
        await client.setScreenHandler(id, params);

        this.screenHandlers = await client.getScreenHandlers();
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
