<template>
  <div class="m-0 p-0">
    <nav class="w-full flex flex-row red-bg justify-content-around">
      <Menubar :model="leftItems" class="red-bg m-0">
        <template #start>
          <router-link to="/" class="text-white flex flex-row align-items-center pr-1 py-1">
            Narrowcasting
            <img style="height: 65px" class="py-1" id="logo" src="../assets/img/gewis-branding.svg" alt="Narrowcast"/>
          </router-link>
        </template>
        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
          </a>
        </template>
      </Menubar>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const leftItems = ref([
  {
    label: "Infoscreen",
    items: [
      {
        label: "Settings",
        route: '/infoscreen/settings',
      },
      {
        label: "Responsibles",
        route: '/infoscreen/roomresponsibles'
      },
    ],
  }, {
    label: "Lights",
    items: [
      {
        label: "Effects",
        route: '/lights/effectsController',
      }
    ]
  }
]);

</script>

<style scoped lang="scss">

</style>
