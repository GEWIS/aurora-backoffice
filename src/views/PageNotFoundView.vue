<template>
  <TopNavbar />
  <div class="page-container">
    <div class="page-title">Not Found</div>
    <div class="content-wrapper flex justify-content-start gap-4">
      <p> We did not found what you are looking for. </p>
    </div>
    <CopyrightBanner />
  </div>
</template>

<script setup lang="ts">
import CopyrightBanner from "@/layout/CopyrightBanner.vue";
import TopNavbar from "@/layout/TopNavbar.vue";
</script>

<style scoped lang="scss">
@import "../styles/BasePage.scss";
</style>
