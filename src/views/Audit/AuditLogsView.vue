<template>
  <AppContainer title="Audit logs" icon="pi-book">
    <div>
      <DataTable :value="store.entries" data-key="id">
        <Column field="createdAt" header="Timestamp">
          <template #body="slotProps">
            {{ new Date(slotProps.data.createdAt).toLocaleString() }}
          </template>
        </Column>
        <Column field="userName" header="Name" />
        <Column field="action" header="Action" />
      </DataTable>
      <Paginator
        :rows="store.take"
        :total-records="store.count"
        :rows-per-page-options="[5, 10, 20, 50]"
        always-show
        @update:first="(value) => store.setSkip(value)"
        @update:rows="(value) => store.setTake(value)"
      />
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { useAuditStore } from '@/stores/audit.store';
import AppContainer from '@/layout/AppContainer.vue';

const store = useAuditStore();
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
