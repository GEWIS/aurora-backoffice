<template>
  <Panel header="Recent activity">
    <template #header>
      <div class="p-panel-title uppercase">
        <FontAwesomeIcon
          :icon="faFileLines"
          class="mr-1 text-xl"
          :style="{ marginTop: '-0.25rem', marginBottom: '-0.15rem' }"
        />
        Recent activity
      </div>
    </template>
    <template #default>
      <div class="flex flex-column gap-3">
        <DataTable
          :value="store.dashboardEntries"
          data-key="id"
          size="small"
          :loading="store.loading"
        >
          <Column field="createdAt" header="Timestamp">
            <template #body="slotProps">
              {{ new Date(slotProps.data.createdAt).toLocaleString() }}
            </template>
          </Column>
          <Column field="userName" header="Name" />
          <Column field="action" header="Action" />
        </DataTable>
        <router-link to="/audit">More recent activity...</router-link>
      </div>
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { useAuditStore } from '@/stores/audit.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const store = useAuditStore();
store.take = 20;
store.skip = 0;
store.getLogs();
</script>

<style scoped></style>
