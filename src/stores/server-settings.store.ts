import { defineStore } from 'pinia';
import { type FeatureFlagResponse, type ISettings, setSetting } from '@/api';
import { getFeatureFlags, getSettings } from '@/api';

interface ServerSettingsStore {
  serverSettings?: ISettings;
  featureFlags: FeatureFlagResponse;
  loading: boolean;
}

export const useServerSettingsStore = defineStore('server-settings', {
  state: (): ServerSettingsStore => ({
    serverSettings: undefined,
    featureFlags: [],
    loading: true,
  }),
  actions: {
    async init(): Promise<void> {
      await getSettings().then((res) => {
        if (res && res.data) this.serverSettings = res.data;
      });
      await getFeatureFlags().then((res) => {
        if (res && res.data) this.featureFlags = res.data;
      });
      this.loading = false;
    },
    isFeatureFlag(setting: string | keyof ISettings): boolean {
      return this.featureFlags.some((f) => f.key === setting);
    },
    featureEnabled(setting: keyof ISettings): boolean {
      const match = this.featureFlags.find((f) => f.key === setting);
      if (!match) return true;
      return match.value;
    },
    async setSetting(setting: keyof ISettings, value: ISettings[keyof ISettings]): Promise<void> {
      if (!this.serverSettings) return;

      this.loading = true;
      await setSetting({ body: { key: setting, value } });
      this.serverSettings[setting] = value as never;
      this.loading = false;
    },
  },
});
