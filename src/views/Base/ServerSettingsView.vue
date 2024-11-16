<template>
  <AppContainer icon="pi-cog" title="Server Settings">
    <TreeTable data-key="key" :value="entries">
      <Column expander field="name" header="Setting name" sortable></Column>
      <Column field="value" header="Setting value"></Column>
      <Column field="isFeatureFlag" header="Feature flag">
        <template #body="slotProps">
          <div v-if="slotProps.node.data.isFeatureFlag && !!slotProps.node.data.value">
            <i class="pi pi-flag-fill" title="Enabled"></i>
          </div>
          <div v-else-if="slotProps.node.data.isFeatureFlag">
            <i class="pi pi-flag" title="Disabled"></i>
          </div>
          <div v-else></div>
        </template>
      </Column>
    </TreeTable>
  </AppContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Column from 'primevue/column';
import TreeTable from 'primevue/treetable';
import type { TreeNode } from 'primevue/treenode';
import AppContainer from '@/layout/AppContainer.vue';
import { useServerSettingsStore } from '@/stores/server-settings.store';

const store = useServerSettingsStore();
const entries = computed(() => {
  const keys = Object.keys(store.serverSettings);

  const createTreeNodes: TreeNode[] = (currentKey: string): TreeNode[] => {
    const subKeys = keys.filter((k) => k.startsWith(currentKey));

    const usedKeys: string[] = [];

    return subKeys.map((key): TreeNode | undefined => {
      const remainder = key.substring(currentKey.length, key.length);
      if (remainder == "") return undefined;

      const nextKey = currentKey + remainder.split('.')[0] + '.';
      if (usedKeys.includes(nextKey)) return undefined;

      usedKeys.push(nextKey);
      const setting = currentKey + remainder;
      const children: TreeNode[] = createTreeNodes(nextKey);
      return {
        key: setting,
        label: remainder,
        data: {
          name: remainder,
          value: store.serverSettings[setting],
          isFeatureFlag: store.isFeatureFlag(setting),
        },
        children: children.length > 0 ? children : undefined,
      }
    }).filter((x) => x != undefined);
  };
  return createTreeNodes('');
});
console.log(entries.value);
</script>

<style scoped>
@use '@/assets/layout/layout.scss';

</style>
