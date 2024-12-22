<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem :index="i" :item="item" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppMenuItem, { type MenuItem } from './AppMenuItem.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const authStore = useAuthStore();
const settingsStore = useServerSettingsStore();

// Calculate all items in the menu based on the user's security groups
const model = computed<MenuItem[]>(() => {
  const showPosters = authStore.isInSecurityGroup('poster', 'base');
  const showGewisPosters = settingsStore.featureEnabled('GewisPosterScreenHandler');
  const showHubblePosters = settingsStore.featureEnabled('HubblePosterScreenHandler');
  const showAudit = authStore.isInSecurityGroup('audit', 'base');
  const showCenturion =
    authStore.isInSecurityGroup('centurion', 'privileged') && settingsStore.featureEnabled('Centurion');
  const showTimeTrail =
    authStore.isInSecurityGroup('timetrail', 'base') && settingsStore.featureEnabled('TimeTrailRace');

  const showEffects = authStore.isInSecurityGroup('effects', 'base');
  const showScenes = authStore.isInSecurityGroup('scenes', 'base');
  const showFixtures = authStore.isInSecurityGroup('handler', 'base');

  const showSettings = authStore.isInSecurityGroup('serverSettings', 'privileged');

  return [
    {
      label: 'Home',
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        showAudit && { label: 'Logs', icon: 'pi pi-fw pi-book', to: '/audit' },
      ].filter(Boolean),
    },
    showPosters && {
      label: 'Screens',
      items: [
        showGewisPosters && { label: 'GEWIS Posters', icon: 'pi pi-fw pi-image', to: '/poster/gewis' },
        showHubblePosters && { label: 'Hubble Posters', icon: 'pi pi-fw pi-image', to: '/poster/hubble' },
      ],
    },
    {
      label: 'Lights',
      items: [
        showEffects && { label: 'Effects', icon: 'pi pi-fw pi-sparkles', to: '/lights/effects' },
        showScenes && {
          label: 'Scenes',
          icon: 'pi pi-fw pi-sliders-h',
          to: '/lights/scenesController',
        },
        showFixtures && { label: 'Fixtures', icon: 'pi pi-fw pi-bolt', to: '/lights/fixtures' },
      ].filter(Boolean),
    },
    (showCenturion || showTimeTrail) && {
      label: 'Modes',
      items: [
        showTimeTrail && {
          label: 'Spoelbakkenrace',
          icon: 'pi pi-fw pi-hourglass',
          to: '/modes/timetrailrace',
        },
        showCenturion && { label: 'Centurion', icon: 'pi pi-fw pi-crown', to: '/modes/centurion' },
      ].filter(Boolean),
    },
    showSettings && {
      label: 'Settings',
      items: [{ label: 'Server Settings', icon: 'pi pi-fw pi-cog', to: '/settings' }],
    },
  ].filter(Boolean) as MenuItem[];
});
</script>
