<template>
  <Menubar :model="leftItems" class="m-0">
    <template #start>
      <router-link to="/">
        <img
          style="height: 65px"
          class="py-1 ml-4 mr-4"
          id="logo"
          src="../assets/img/gewis-branding.svg"
          alt="Narrowcast"
        />
      </router-link>
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
    <template #end>
      <ThemeSelector />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ThemeSelector from '@/layout/ThemeSelector.vue';

const leftItems = ref([
  {
    label: 'Infoscreen',
    items: [
      {
        label: 'Settings',
        route: '/infoscreen/settings'
      },
      {
        label: 'Responsibles',
        route: '/infoscreen/roomresponsibles'
      }
    ]
  },
  {
    label: 'Posterscreen',
    items: [
      {
        label: 'Posters',
        route: '/poster/list'
      }
    ]
  },
  {
    label: 'Modes',
    items: [
      {
        label: 'Centurion',
        route: '/modes/centurion'
      }
    ]
  },
  {
    label: 'Lights',
    items: [
      {
        label: 'Effects',
        route: '/lights/effectsController'
      }
    ]
  }
]);
</script>

<style scoped lang="scss">
:root[data-theme='dark'] #logo {
  filter: invert(0.9);
}
</style>
