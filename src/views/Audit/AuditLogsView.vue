<template>
  <div class="page-container">
    <div class="page-title">Audit logs</div>
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
        :totalRecords="store.count"
        :rows-per-page-options="[5, 10, 20, 50]"
        @update:first="(value) => store.setSkip(value)"
        @update:rows="(value) => store.setTake(value)"
        always-show
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuditStore } from '@/stores/audit.store';

const store = useAuditStore();
</script>

<style scoped></style>
