import { defineStore } from 'pinia';
import {
  Audio,
  Client,
  HandlerResponse_Audio_,
  HandlerResponse_LightsGroup_,
  HandlerResponse_Screen_,
  LightsGroup,
  Screen
} from '@/api/Client';
import { handleError } from '@/utils/errorHandler';

interface HandlersStore {
  audioHandlers: HandlerResponse_Audio_[];
  lightsHandlers: HandlerResponse_LightsGroup_[];
  screenHandlers: HandlerResponse_Screen_[];
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
    getRegisteredAudios(handlerName?: string): Audio[] {
      if (!handlerName) return this.audioHandlers.map((h) => h.entities).flat();
      const handler = this.audioHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    },
    getRegisteredLights(handlerName?: string): LightsGroup[] {
      if (!handlerName) return this.lightsHandlers.map((h) => h.entities).flat();
      const handler = this.lightsHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    },
    getRegisteredScreens(handlerName?: string): Screen[] {
      if (!handlerName) return this.screenHandlers.map((h) => h.entities).flat();
      const handler = this.screenHandlers.find((h) => h.name === handlerName);
      if (!handler) return [];
      return handler.entities;
    }
  }
});
