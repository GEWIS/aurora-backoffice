import { defineStore } from 'pinia';
import {
  HandlersService,
  type LightsEffectsColorCreateParams,
  type LightsEffectsMovementCreateParams,
  type LightsGroupResponse,
  LightsService
} from '@/api';

export interface PushedEffect {
  timestamp: Date;
  lightGroupIds: number[];
  colorEffect?: LightsEffectsColorCreateParams;
  movementEffect?: LightsEffectsMovementCreateParams;
}

interface EffectsControllerStore {
  selectedLightsGroupIds: number[];
  pastPushedEffects: PushedEffect[];
}

export const useEffectsControllerStore = defineStore('effectsController', {
  state: (): EffectsControllerStore => ({
    selectedLightsGroupIds: [],
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
    setColorEffect(effect: LightsEffectsColorCreateParams, lightGroupIds?: number[]) {
      const ids = lightGroupIds ?? this.selectedLightsGroupIds;
      ids.map(async (id) => {
        await HandlersService.applyLightsEffectColor(id, [effect]);
      });
      const pastEffect: PushedEffect = {
        colorEffect: { ...effect },
        lightGroupIds: [...ids],
        timestamp: new Date()
      };
      this.pastPushedEffects = [pastEffect, ...this.pastPushedEffects.slice(0, 9)];
    },
    setMovementEffect(effect: LightsEffectsMovementCreateParams, lightGroupIds?: number[]) {
      const ids = lightGroupIds ?? this.selectedLightsGroupIds;
      ids.map(async (id) => {
        await HandlersService.applyLightsEffectMovement(id, [effect]);
      });
      const pastEffect: PushedEffect = {
        movementEffect: { ...effect },
        lightGroupIds: [...ids],
        timestamp: new Date()
      };
      this.pastPushedEffects = [pastEffect, ...this.pastPushedEffects.slice(0, 9)];
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
