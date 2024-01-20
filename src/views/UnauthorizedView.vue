<template>
  <div class="page-container">
    <div class="page-title">{{ $t('errors.unauthorized') }}</div>
    <div class="content-wrapper flex justify-content-start gap-4">
      <p> You logged in successfully, but do not have the rights to use narrowcasting. </p>
    </div>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/layout/CopyrightBanner.vue";
</script>

<style scoped lang="scss">
@import "../styles/BasePage.scss";
</style>
