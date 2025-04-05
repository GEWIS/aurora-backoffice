<template>
  <AppContainer icon="pi-share-alt" title="Integrations">
    <template #header>
      <div class="flex flex-row gap-2"></div>
    </template>
    <DataTable :loading="store.loading" :value="store.integrationUsers">
      <Column field="name" header="Name"></Column>
      <Column field="endpoints" header="Endpoints"></Column>
      <Column>
        <template #body="">
          <div class="flex flex-row gap-2"></div>
        </template>
      </Column>
    </DataTable>
  </AppContainer>
</template>

<script setup lang="ts">
import { useIntegrationUserStore } from '@/stores/integration-user.store';
import AppContainer from '@/layout/AppContainer.vue';

const store = useIntegrationUserStore();
void store.init();
</script>

<style scoped></style>
