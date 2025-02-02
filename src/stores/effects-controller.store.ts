import { defineStore } from 'pinia';
import {
  applyLightsEffectColor,
  applyLightsEffectMovement,
  createPredefinedLightsEffect,
  deletePredefinedLightsEffect,
  disableStrobeOnLightsGroup,
  enableStrobeOnLightsGroup,
  getAllLightsSwitches,
  getAllPredefinedLightsEffects,
  type LightsButtonSwitch,
  type LightsEffectsColorCreateParams,
  type LightsEffectsMovementCreateParams,
  type LightsGroupResponse,
  type LightsPredefinedEffectCreateParams,
  type LightsPredefinedEffectProperties,
  type LightsPredefinedEffectResponse,
  type LightsSwitchResponse,
  RgbColor,
  turnOffLightsSwitch,
  turnOnLightsSwitch,
  updatePredefinedLightsEffect,
} from '@/api';

interface PushedEffect {
  timestamp: Date;
  lightGroupIds: number[];
  colorEffect?: LightsEffectsColorCreateParams;
  movementEffect?: LightsEffectsMovementCreateParams;
}

interface LightsSwitch extends LightsSwitchResponse {
  enabled: boolean;
}

interface EffectsControllerStore {
  // Simple effects controller
  lightsSwitches: LightsSwitch[];
  buttonEffects: LightsPredefinedEffectResponse[];
  currentColors: RgbColor[];
  loading: boolean;

  // Advanced effects controller
  selectedLightsGroupIds: number[];
  pastPushedEffects: PushedEffect[];
}

export const useEffectsControllerStore = defineStore('effectsController', {
  state: (): EffectsControllerStore => ({
    lightsSwitches: [],
    buttonEffects: [],
    currentColors: [],
    loading: true,

    selectedLightsGroupIds: [],
    pastPushedEffects: [],
  }),
  getters: {},
  actions: {
    async init() {
      await Promise.all([this.getLightsSwitches(), this.getButtonEffects()]);
      this.loading = true;
    },
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
    async enableStrobe(lightGroupIds?: number[]) {
      const ids = lightGroupIds ?? this.selectedLightsGroupIds;
      await Promise.all(
        ids.map((id) => {
          return enableStrobeOnLightsGroup({
            path: { id },
          });
        }),
      );
    },
    async disableStrobe(lightGroupIds?: number[]) {
      const ids = lightGroupIds ?? this.selectedLightsGroupIds;
      await Promise.all(
        ids.map((id) => {
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
    async turnOnLightsSwitch(id: number) {
      await turnOnLightsSwitch({ path: { id } });
    },
    async turnOnLightsSwitches(ids: number[]) {
      await Promise.all(ids.map((id) => turnOnLightsSwitch({ path: { id } })));
    },
    async turnOffLightsSwitch(id: number) {
      await turnOffLightsSwitch({ path: { id } });
    },
    async turnOffLightsSwitches(ids: number[]) {
      await Promise.all(ids.map((id) => turnOffLightsSwitch({ path: { id } })));
    },
    async getLightsSwitches() {
      const response = await getAllLightsSwitches();
      if (!response.response.ok || !response.data) {
        return;
      }

      this.lightsSwitches = response.data.map((r) => ({ ...r, enabled: false }));
      const response2 = await getAllLightsSwitches({ query: { enabled: true } });
      if (!response2.response.ok || !response2.data) {
        return;
      }
      response2.data?.forEach((s) => {
        const index = this.lightsSwitches.findIndex((s2) => s.id === s2.id);
        if (index >= 0) this.lightsSwitches[index].enabled = true;
      });
    },
    async getButtonEffects() {
      const response = await getAllPredefinedLightsEffects();
      if (response.response.ok && response.data) {
        this.buttonEffects = response.data;
      }
      this.buttonEffects.sort((a, b) => a.buttonId - b.buttonId);
      for (let i = 1; i <= 64; i++) {
        if (this.buttonEffects[i]?.buttonId !== i) {
          this.buttonEffects.splice(i, 0, {
            id: -1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            buttonId: i,
            properties: {
              type: 'LightsButtonNull',
            },
          });
        }
      }
    },
    async createButtonEffect(params: LightsPredefinedEffectCreateParams) {
      const response = await createPredefinedLightsEffect({ body: params });
      if (response.response.ok && response.data) {
        this.buttonEffects.push(response.data);
      }
    },
    async updateButtonEffectProperties(id: number, properties: LightsPredefinedEffectProperties) {
      const response = await updatePredefinedLightsEffect({ path: { id }, body: { properties } });
      if (response.response.ok && response.data) {
        const index = this.buttonEffects.findIndex((g) => g.id === id);
        this.buttonEffects.splice(index, 1, response.data);
      }
    },
    async updateButtonEffectPosition(id: number, newButtonId: number) {
      const response = await updatePredefinedLightsEffect({ path: { id }, body: { buttonId: newButtonId } });
      if (response.response.ok && response.data) {
        const index = this.buttonEffects.findIndex((g) => g.id === id);
        this.buttonEffects.splice(index, 1, response.data);
      }
    },
    async deleteButtonEffect(id: number) {
      const response = await deletePredefinedLightsEffect({ path: { id } });
      if (response.response.ok) {
        const index = this.buttonEffects.findIndex((g) => g.id === id);
        this.buttonEffects.splice(index, 1);
      }
    },
    async onEffectButtonPress(button: LightsPredefinedEffectResponse) {
      switch (button.properties.type) {
        case 'LightsButtonColors': {
          this.currentColors = button.properties.colors;
          return;
        }
        case 'LightsButtonEffectColor': {
          const body: LightsEffectsColorCreateParams = button.properties.effectProps;
          if ('colors' in body.props) {
            body.props.colors = this.currentColors;
          }
          this.setColorEffect(body, button.properties.lightsGroupIds);
          return;
        }
        case 'LightsButtonEffectMovement': {
          this.setMovementEffect(button.properties.effectProps, button.properties.lightsGroupIds);
          return;
        }
        case 'LightsButtonStrobe': {
          await this.enableStrobe(button.properties.lightsGroupIds);
          return;
        }
        case 'LightsButtonSwitch': {
          const lightsSwitches = this.lightsSwitches.filter((s) =>
            (button.properties as LightsButtonSwitch).switchIds.includes(s.id),
          );
          await Promise.all(
            lightsSwitches.map(async (lightsSwitch) => {
              if (lightsSwitch.enabled) {
                await this.turnOffLightsSwitch(lightsSwitch.id);
              } else {
                await this.turnOnLightsSwitch(lightsSwitch.id);
              }
            }),
          );
        }
      }
    },
    async onEffectButtonRelease(button: LightsPredefinedEffectResponse) {
      switch (button.properties.type) {
        case 'LightsButtonStrobe': {
          await this.disableStrobe(button.properties.lightsGroupIds);
          return;
        }
      }
    },
  },
});

export { type PushedEffect };
