<template>
  <LightsGroupsSelect v-model="lightsGroupIds" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LightsGroupsSelect from '@/components/lights/effects/button/LightsGroupsSelect.vue';

const lightsGroupIds = ref<number[]>([]);
</script>

<style scoped></style>
