<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>Aurora</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <ToggleButton
        v-model="isLightMode"
        offIcon="pi pi-moon"
        offLabel=""
        onIcon="pi pi-sun"
        onLabel=""
        @click="onThemeChangeButton"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { usePrimeVue } from 'primevue/config';
const { layoutConfig, onMenuToggle } = useLayout();

const topbarMenuActive = ref(false);
const isLightMode = ref(false);
const $primevue = usePrimeVue();

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onThemeChangeButton = () => {
  let newTheme = isLightMode.value ? 'aura-light-blue' : 'aura-dark-blue';
  $primevue.changeTheme(layoutConfig.theme.value, newTheme, 'theme-css', () => {
    layoutConfig.theme.value = newTheme;
    layoutConfig.darkTheme.value = isLightMode;
  });
};

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

// const topbarMenuClasses = computed(() => {
//   return {
//     'layout-topbar-menu-mobile-active': topbarMenuActive.value
//   };
// });
</script>

<style lang="scss" scoped></style>
