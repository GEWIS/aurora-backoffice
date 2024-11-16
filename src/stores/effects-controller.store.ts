import { defineStore } from 'pinia';
import {
  applyLightsEffectColor,
  applyLightsEffectMovement,
  disableStrobeOnLightsGroup,
  enableStrobeOnLightsGroup,
  type LightsEffectsColorCreateParams,
  type LightsEffectsMovementCreateParams,
  type LightsGroupResponse,
} from '@/api';

interface PushedEffect {
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
    pastPushedEffects: [],
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
        await applyLightsEffectColor({
          body: [effect],
          path: { id },
        });
      });
      const pastEffect: PushedEffect = {
        colorEffect: { ...effect },
        lightGroupIds: [...ids],
        timestamp: new Date(),
      };
      this.pastPushedEffects = [pastEffect, ...this.pastPushedEffects.slice(0, 9)];
    },
    setMovementEffect(effect: LightsEffectsMovementCreateParams, lightGroupIds?: number[]) {
      const ids = lightGroupIds ?? this.selectedLightsGroupIds;
      ids.map(async (id) => {
        await applyLightsEffectMovement({
          body: [effect],
          path: { id },
        });
      });
      const pastEffect: PushedEffect = {
        movementEffect: { ...effect },
        lightGroupIds: [...ids],
        timestamp: new Date(),
      };
      this.pastPushedEffects = [pastEffect, ...this.pastPushedEffects.slice(0, 9)];
    },
    async enableStrobe() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return enableStrobeOnLightsGroup({
            path: { id },
          });
        }),
      );
    },
    async disableStrobe() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return disableStrobeOnLightsGroup({
            path: { id },
          });
        }),
      );
    },
    async disableLightsColors() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return applyLightsEffectColor({
            body: [],
            path: { id },
          });
        }),
      );
    },
    async disableLightsMovement() {
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return applyLightsEffectMovement({
            body: [],
            path: { id },
          });
        }),
      );
    },
  },
});

export { type PushedEffect };
