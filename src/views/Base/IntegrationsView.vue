<template>
  <AppContainer icon="pi-share-alt" title="Integrations">
    <template #header>
      <div class="flex flex-row gap-2">
        <IntegrationDialogCreate />
      </div>
    </template>
    <DataTable :loading="store.loading" :value="store.integrationUsers">
      <Column field="name" header="Name"></Column>
      <Column field="endpoints" header="Endpoints"></Column>
      <Column header="API key">
        <template #body="slotProps">
          <IntegrationUserApiKey :integration-user="slotProps.data" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex flex-row gap-2">
            <IntegrationDialogUpdate :integration-user="slotProps.data" />
            <IntegrationDeleteButton :integration-user="slotProps.data" />
          </div>
        </template>
      </Column>
    </DataTable>
  </AppContainer>
</template>

<script setup lang="ts">
import { useIntegrationsStore } from '@/stores/integrations.store';
import AppContainer from '@/layout/AppContainer.vue';
import IntegrationDeleteButton from '@/components/integrations/IntegrationDeleteButton.vue';
import IntegrationUserApiKey from '@/components/integrations/IntegrationUserApiKey.vue';
import IntegrationDialogUpdate from '@/components/integrations/IntegrationDialogUpdate.vue';
import IntegrationDialogCreate from '@/components/integrations/IntegrationDialogCreate.vue';

const store = useIntegrationsStore();
void store.init();
</script>

<style scoped></style>
