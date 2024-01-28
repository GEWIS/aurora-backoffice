import type { LightsEffectsColorCreateParams } from '@/api/Client';
import { defineStore } from 'pinia';
import { Client, LightsEffectsMovementCreateParams, LightsGroup } from "@/api/Client";


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
    selectAllLightsGroups(groups: LightsGroup[]) {
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
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map(async (id) => {
          if (this.chosenColorEffects.length > 0) {
            await client.applyLightsEffectColor(id, this.chosenColorEffects);
          }
          if (this.chosenMovementEffects.length > 0) {
            await client.applyLightsEffectMovement(id, this.chosenMovementEffects);
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
    },
    async disableLightsColors() {
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return client.applyLightsEffectColor(id, []);
        }),
      );
    },
    async disableLightsMovement() {
      const client = new Client();
      await Promise.all(
        this.selectedLightsGroupIds.map((id) => {
          return client.applyLightsEffectMovement(id, []);
        }),
      );
    },
  }
});
