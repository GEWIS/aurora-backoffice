import { defineStore } from 'pinia';

import {
  type HttpApiException,
  type Information,
  type InformationParams,
  InfoscreenService,
  type Member,
  type Message,
  RoomStatusEnum
} from '@/api';
import { handleError } from '@/utils/errorHandler';

interface InfoscreenStore {
  infoscreenSettings: InformationParams;
  infoscreenMessages: Array<Message>;
  infoscreenResponsibles: Array<Member>;
  infoscreenBoard: Array<Member>;
  infoscreenERO: Array<Member>;
}

export const useInfoscreenStore = defineStore('infoscreen', {
  state: (): InfoscreenStore => ({
    infoscreenSettings: {
      roomStatus: RoomStatusEnum.CLOSED,
      alcoholTime: null,
      firstResponsible: null,
      secondResponsible: null,
      firstERO: null,
      secondERO: null
    },
    infoscreenMessages: [],
    infoscreenResponsibles: [],
    infoscreenBoard: [],
    infoscreenERO: []
  }),
  getters: {},
  actions: {
    async getInfo() {
      await InfoscreenService.getInformation().then((a: Information) => {
        this.infoscreenSettings.roomStatus = a.roomStatus;
        this.infoscreenSettings.alcoholTime = a.alcoholTime;
        this.infoscreenSettings.firstResponsible = a.firstResponsible;
        this.infoscreenSettings.secondResponsible = a.secondResponsible;
        this.infoscreenSettings.firstERO = a.firstERO;
        this.infoscreenSettings.secondERO = a.secondERO;
      });
    },
    async setInfo() {
      await InfoscreenService.setInformation({
        requestBody: this.infoscreenSettings
      }).catch((e) => handleError(e as HttpApiException));
    },
    async getMessages() {
      await InfoscreenService.getAllMessages()
        .then((a: Array<Message>) => (this.infoscreenMessages = a))
        .catch(handleError);
    },
    async getKeyHolders() {
      await InfoscreenService.getKeyHolders()
        .then((a: Array<Member>) => (this.infoscreenResponsibles = a))
        .catch(handleError);
    },
    async getBoard() {
      await InfoscreenService.getBoard()
        .then((a: Array<Member>) => (this.infoscreenBoard = a))
        .catch(handleError);
    },
    async getERO() {
      await InfoscreenService.getEro()
        .then((a: Array<Member>) => (this.infoscreenERO = a))
        .catch(handleError);
    },
    async init(): Promise<void> {
      await Promise.all([
        this.getInfo(),
        this.getMessages(),
        this.getBoard(),
        this.getKeyHolders(),
        this.getERO()
      ]);
    }
  }
});
