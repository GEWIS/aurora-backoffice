import type { LightsEffectsCreateParams } from '@/api/Client';
import { defineStore } from 'pinia';
import { Client, LightsGroup } from '@/api/Client';

export interface PushedEffects {
  timestamp: Date;
  lightGroupIds: number[];
  effects: LightsEffectsCreateParams[];
}

interface EffectsControllerStore {
  selectedLightsGroupIds: number[];
  chosenEffects: LightsEffectsCreateParams[];
  pastPushedEffects: PushedEffects[];
}

export const useEffectsControllerStore = defineStore('effectsController', {
  state: (): EffectsControllerStore => ({
    selectedLightsGroupIds: [],
    chosenEffects: [],
    pastPushedEffects: []
  }),
  getters: {},
  actions: {
    toggleLightsGroup(id: number) {
      const index = this.selectedLightsGroupIds.findIndex((g) => g === id);
      if (index < 0) {
        this.selectedLightsGroupIds.push(id);
      } else {
        this.selectedLightsGroupIds.splice(index, 1);
      }
    },
    selectAllLightsGroups(groups: LightsGroup[]) {
      this.selectedLightsGroupIds = groups.map((g) => g.id);
    },
    resetLightsGroupSelection() {
      this.selectedLightsGroupIds = [];
    },
    addEffect(effect: LightsEffectsCreateParams) {
      this.chosenEffects.push(effect);
    },
    removeEffect(index: number) {
      this.chosenEffects.splice(index, 1);
    },
    clearEffects() {
      this.chosenEffects = [];
    },
    async sendEffects() {
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return client.applyLightsEffect(id, this.chosenEffects);
        })
      );
      this.pastPushedEffects.unshift({
        effects: this.chosenEffects,
        lightGroupIds: this.selectedLightsGroupIds,
        timestamp: new Date()
      });
      this.chosenEffects = [];
    },
    async enableStrobe() {
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return client.enableStrobeOnLightsGroup(id, undefined);
        })
      );
    },
    async disableStrobe() {
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return client.disableStrobeOnLightsGroup(id);
        })
      );
    }
  }
});
