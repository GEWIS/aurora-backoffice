<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
  },
  {
    label: 'Screens',
    items: [
      { label: 'Infoscreen', icon: 'pi pi-fw pi-info-circle', to: '/infoscreen/settings' },
      { label: 'Posters', icon: 'pi pi-fw pi-image', to: '/poster/list' }
    ]
  },
  {
    label: 'Lights',
    items: [
      { label: 'Effects', icon: 'pi pi-fw pi-sparkles', to: '/blocks', badge: 'NEW' },
      {
        label: 'Scenes',
        icon: 'pi pi-fw pi-globe',
        url: 'https://www.primefaces.org/primeblocks-vue',
        target: '_blank'
      }
    ]
  },
  {
    label: 'Audio',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-megaphone',
        to: '/landing'
      }
    ]
  },
  {
    label: 'Modes',
    items: [
      {
        label: 'Spoelbakkenrace',
        icon: 'pi pi-fw pi-bars',
        to: '/modes/spoelbakkenrace'
      },
      {
        label: 'Centurion',
        icon: 'pi pi-fw pi-crown',
        to: '/modes/centurion'
      }
    ]
  }
]);
</script>

<style lang="scss" scoped></style>
