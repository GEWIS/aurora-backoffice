<template>
  <BasicBlock header="Logs" icon="pi-book">
    <DataTable :value="store.dashboardEntries" data-key="id" :loading="store.loading" class="my-3">
      <Column field="createdAt" header="Timestamp">
        <template #body="slotProps">
          {{ new Date(slotProps.data.createdAt).toLocaleString() }}
        </template>
      </Column>
      <Column field="userName" header="Name" />
      <Column field="action" header="Action" />
    </DataTable>
    <RouterLink to="/audit">More recent activity</RouterLink>
  </BasicBlock>
</template>

<script setup lang="ts">
import { useAuditStore } from '@/stores/audit.store';
import BasicBlock from '@/components/BasicBlock.vue';
const store = useAuditStore();
store.setTake(5);
store.setSkip(0);
store.getLogs();
</script>

<style lang="scss">
@use '@/assets/layout/layout.scss';

th {
  @extend h6;
}
</style>
