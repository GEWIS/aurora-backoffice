<template>
  <div class="m-0 p-0">
    <nav class="w-full flex flex-row red-bg justify-content-around">
      <Menubar :model="leftItems" class="red-bg m-0">
        <template #start>
          <router-link to="/" class="text-white flex flex-row align-items-center pr-1 py-1">
            {{ $t("navigation.narrowcasting") }}
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
      <Menubar :model="rightItems" class="red-bg">
        <template #item="{ label, item, props, root, hasSubmenu }">
          <a :href="item.url" :target="item.target" v-bind="props.action">
            <span v-bind="props.icon" />
            <span v-bind="props.label">{{ label }}</span>
            <span :class="[hasSubmenu && (root ? 'pi pi-fw pi-angle-down' : 'pi pi-fw pi-angle-right')]" v-bind="props.submenuicon" />
          </a>
        </template>
      </Menubar>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const leftItems = ref([
  {
    label: t('navigation.infoscreen'),
    items: [
      {
        label: t('navigation.settings'),
        route: '/infoscreen/settings',
      },
      {
        label: t('navigation.responsibles'),
        route: '/infoscreen/roomresponsibles'
      },
    ],
  }, {
    label: t('navigation.lights'),
    items: [
      {
        label: t('navigation.effectsController'),
        route: '/lights/effectsController',
      }
    ]
  }
]);

const rightItems = ref([
  {
    label: '',
    icon: 'pi pi-globe',
    items: [
      {
        label: t('app.Netherlands'),
        disabled: () => locale.value == 'nl',
        command: () => {
          locale.value = 'nl';
          localStorage.setItem('locale', 'nl');
        },
      },
      {
        label: t('app.English'),
        disabled: () => locale.value == 'en',
        command: () => {
          locale.value = 'en';
          localStorage.setItem('locale', 'en');
        },
      },
    ]
  },
]);

</script>

<style scoped lang="scss">

</style>
