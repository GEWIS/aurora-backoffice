import { defineStore } from 'pinia';
import {
  AudioResponse,
  Client,
  HandlerResponse_AudioResponse_,
  HandlerResponse_LightsGroupResponse_,
  HandlerResponse_ScreenResponse_,
  LightsGroupResponse, ScreenResponse
} from '@/api/Client';
import { handleError } from '@/utils/errorHandler';

interface HandlersStore {
  audioHandlers: HandlerResponse_AudioResponse_[];
  lightsHandlers: HandlerResponse_LightsGroupResponse_[];
  screenHandlers: HandlerResponse_ScreenResponse_[];
}

export const useHandlersStore = defineStore('handlers', {
  state: (): HandlersStore =>
    ({
      audioHandlers: [],
      lightsHandlers: [],
      screenHandlers: []
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
