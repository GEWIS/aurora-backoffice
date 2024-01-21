import type { LightsEffectsCreateParams } from '@/api/Client';
import { defineStore } from 'pinia';
import { LightsGroup } from '@/api/Client';

interface PushedEffects {
  timestamp: Date;
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
    pastPushedEffects: [],
  }),
  getters: {
  },
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
  },
});
