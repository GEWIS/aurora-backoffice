<template>
  <Button
    type="button"
    icon="pi pi-sun"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="theme_selector_menu"
    severity="primary"
    outlined
  />
  <Menu ref="menu" id="theme_selector_menu" :model="items" :popup="true" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const menu = ref();
const darkMode = ref<boolean>(document.documentElement.getAttribute('data-theme') === 'dark');
const items = ref([
  {
    label: 'Theme',
    items: [
      {
        label: 'Light mode',
        icon: 'pi pi-sun',
        command: () => enableDarkMode(false),
      },
      {
        label: 'Dark mode',
        icon: 'pi pi-moon',
        command: () => enableDarkMode(true),
      }
    ]
  }
]);

const toggle = (event) => {
  console.log(menu.value);
  menu.value.toggle(event);
};

const enableDarkMode = (darkEnabled: boolean) => {
  darkMode.value = darkEnabled;
  if (darkEnabled) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
</script>

<style scoped>

</style>