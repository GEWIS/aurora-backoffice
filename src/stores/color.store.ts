import type { LightsColorResponse } from '@/api/Client';
import { defineStore } from 'pinia';
import { Client, RgbColor } from '@/api/Client';

interface ColorStore {
  colors: LightsColorResponse[];
}

export const useColorStore = defineStore('color', {
  state: (): ColorStore => ({
    colors: []
  }),
  actions: {
    async init(): Promise<void> {
      await new Client().getAllLightsColors().then((colors) => (this.colors = colors));
    },
    getHexColor(c: RgbColor): string {
      const color = this.colors.find((c1) => c1.color === c);
      if (!color) return '';
      return color.spec.hex;
    }
  }
});
