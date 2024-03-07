import { defineStore } from 'pinia';
import {
  HandlersService,
  type LightsEffectsColorCreateParams,
  type LightsEffectsMovementCreateParams,
  type LightsGroupResponse,
  LightsService
} from '@/api';

export interface PushedEffects {
  timestamp: Date;
  lightGroupIds: number[];
  colorEffects: LightsEffectsColorCreateParams[];
  movementEffects: LightsEffectsMovementCreateParams[];
}

interface EffectsControllerStore {
  selectedLightsGroupIds: number[];
  chosenColorEffects: LightsEffectsColorCreateParams[];
  chosenMovementEffects: LightsEffectsMovementCreateParams[];
  pastPushedEffects: PushedEffects[];
}

export const useEffectsControllerStore = defineStore('effectsController', {
  state: (): EffectsControllerStore => ({
    selectedLightsGroupIds: [],
    chosenColorEffects: [],
    chosenMovementEffects: [],
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
    selectAllLightsGroups(groups: LightsGroupResponse[]) {
      this.selectedLightsGroupIds = groups.map((g) => g.id);
    },
    resetLightsGroupSelection() {
      this.selectedLightsGroupIds = [];
    },
    addColorEffect(effect: LightsEffectsColorCreateParams) {
      this.chosenColorEffects.push(effect);
    },
    addMovementEffect(effect: LightsEffectsMovementCreateParams) {
      this.chosenMovementEffects.push(effect);
    },
    removeColorEffect(index: number) {
      this.chosenColorEffects.splice(index, 1);
    },
    removeMovementEffect(index: number) {
      this.chosenMovementEffects.splice(index, 1);
    },

    clearEffects() {
      this.chosenColorEffects = [];
      this.chosenMovementEffects = [];
    },
    async sendEffects() {
      await Promise.all(
        this.selectedLightsGroupIds.map(async (id) => {
          if (this.chosenColorEffects.length > 0) {
            await HandlersService.applyLightsEffectColor(id, this.chosenColorEffects);
          }
          if (this.chosenMovementEffects.length > 0) {
            await HandlersService.applyLightsEffectMovement(id, this.chosenMovementEffects);
          }
        })
      );
      this.pastPushedEffects.unshift({
        colorEffects: this.chosenColorEffects,
        movementEffects: this.chosenMovementEffects,
        lightGroupIds: this.selectedLightsGroupIds,
        timestamp: new Date()
      });
      this.chosenColorEffects = [];
      this.chosenMovementEffects = [];
    },
    async enableStrobe() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return LightsService.enableStrobeOnLightsGroup(id, undefined);
        })
      );
    },
    async disableStrobe() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return LightsService.disableStrobeOnLightsGroup(id);
        })
      );
    },
    async disableLightsColors() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return HandlersService.applyLightsEffectColor(id, []);
        })
      );
    },
    async disableLightsMovement() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return HandlersService.applyLightsEffectMovement(id, []);
        })
      );
    }
  }
});
