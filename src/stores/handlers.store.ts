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
  gettingAudio: boolean;
  settingAudio: boolean;
  gettingScreens: boolean;
  settingScreens: boolean;
  gettingLights: boolean;
  settingLights: boolean;
}

export const useHandlersStore = defineStore('handlers', {
  state: (): HandlersStore =>
    ({
      audioHandlers: [],
      lightsHandlers: [],
      screenHandlers: [],
      gettingAudio: false,
      settingAudio: false,
      gettingScreens: false,
      settingScreens: false,
      gettingLights: false,
      settingLights: false
    }) as HandlersStore,
  getters: {},
  actions: {
    async getAudioHandlers() {
      this.gettingAudio = true;
      await HandlersService.getAudioHandlers().then((handlers) => (this.audioHandlers = handlers));
      this.gettingAudio = false;
    },
    async getLightsHandlers() {
      this.gettingLights = true;
      await HandlersService.getLightsHandlers().then(
        (handlers) => (this.lightsHandlers = handlers)
      );
      this.gettingLights = false;
    },
    async getScreenHandlers() {
      this.gettingScreens = true;
      await HandlersService.getScreenHandlers().then(
        (handlers) => (this.screenHandlers = handlers)
      );
      this.gettingScreens = false;
    },
    async init(): Promise<void> {
      this.gettingAudio = true;
      this.gettingScreens = true;
      this.gettingLights = true;
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

      this.gettingAudio = false;
      this.gettingScreens = false;
      this.gettingLights = false;
    },
    async setAudioHandler(id: number | number[], newHandler: string | null = null): Promise<void> {
      try {
        this.settingAudio = true;
        if (Array.isArray(id)) {
          await Promise.all(
            id.map((i) =>
              HandlersService.setAudioHandler(i, {
                name: newHandler != null ? newHandler : ''
              })
            )
          );
        } else {
          await HandlersService.setAudioHandler(id, {
            name: newHandler != null ? newHandler : ''
          });
        }

        this.audioHandlers = await HandlersService.getAudioHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.settingAudio = false;
    },
    async setLightsHandler(id: number | number[], newHandler: string | null = null): Promise<void> {
      try {
        this.settingLights = true;
        if (Array.isArray(id)) {
          await Promise.all(
            id.map((i) =>
              HandlersService.setLightsHandler(i, {
                name: newHandler != null ? newHandler : ''
              })
            )
          );
        } else {
          await HandlersService.setLightsHandler(id, {
            name: newHandler != null ? newHandler : ''
          });
        }

        this.lightsHandlers = await HandlersService.getLightsHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.settingLights = false;
    },
    async setScreenHandler(id: number | number[], newHandler: string | null = null): Promise<void> {
      try {
        this.settingScreens = true;
        if (Array.isArray(id)) {
          await Promise.all(
            id.map((i) =>
              HandlersService.setScreenHandler(i, {
                name: newHandler != null ? newHandler : ''
              })
            )
          );
        } else {
          await HandlersService.setScreenHandler(id, {
            name: newHandler != null ? newHandler : ''
          });
        }

        this.screenHandlers = await HandlersService.getScreenHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.settingScreens = false;
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
    },
    async reset() {
      try {
        this.gettingAudio = true;
        this.gettingScreens = true;
        this.gettingLights = true;
        await HandlersService.resetAllHandlersToDefaults();

        await this.getAudioHandlers();
        await this.getLightsHandlers();
        await this.getScreenHandlers();
      } catch (e: any) {
        handleError(e);
      }
      this.gettingAudio = false;
      this.gettingScreens = false;
      this.gettingLights = false;
    }
  }
});
