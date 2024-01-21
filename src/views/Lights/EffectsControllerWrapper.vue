<script setup lang="ts">
import EffectsController from '@/views/Lights/EffectsController.vue';

</script>

<template>
  <div class="page-container my-0">
    <div class="page-title">Effects controller</div>
    <Suspense>
      <EffectsController />
      <template #fallback>
        <Spinner />
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
@import "../../styles/BasePage.scss";
</style>
