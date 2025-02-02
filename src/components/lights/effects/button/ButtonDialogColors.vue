<template>
  <SelectorLightsColor @colors-updated="(c) => (colors = c)" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SelectorLightsColor from '@/components/lights/effects/props/SelectorLightsColor.vue';
import { RgbColor } from '@/api';

const colors = ref<RgbColor[]>([]);
</script>

<style scoped></style>
