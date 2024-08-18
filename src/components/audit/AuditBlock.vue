<template>
  <AppContainer title="Logs" icon="pi-book">
    <DataTable :value="store.dashboardEntries" data-key="id" :loading="store.loading" class="mb-3">
      <Column field="createdAt" header="Timestamp">
        <template #body="slotProps">
          {{ new Date(slotProps.data.createdAt).toLocaleString() }}
        </template>
      </Column>
      <Column field="userName" header="Name" />
      <Column field="action" header="Action" />
    </DataTable>
    <RouterLink to="/audit">More recent activity</RouterLink>
  </AppContainer>
</template>

<script setup lang="ts">
import { useAuditStore } from '@/stores/audit.store';
import AppContainer from '@/layout/AppContainer.vue';
const store = useAuditStore();
store.setTake(5);
store.setSkip(0);
store.getLogs();
</script>

<style lang="scss">
@use '@/assets/layout/layout.scss';

th {
  padding-top: 0 !important;
  @extend h6;
}

.p-datatable-column-title {
  font-weight: 500 !important;
}
</style>
