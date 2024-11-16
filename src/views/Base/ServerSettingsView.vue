<template>
  <AppContainer icon="pi-cog" title="Server Settings">
    <template #header>
      <div class="flex flex-row gap-2">
        <Button
          v-if="!editing"
          icon="pi pi-lock-open"
          label="Unlock"
          severity="secondary"
          @click="editing = !editing"
        ></Button>
        <Button v-if="editing" icon="pi pi-lock" label="Lock" @click="editing = !editing"></Button>
      </div>
    </template>
    <TreeTable data-key="key" :loading="store.loading" :value="entries">
      <Column expander field="name" header="Setting name" sortable></Column>
      <Column field="value" header="Setting value">
        <template #body="slotProps">
          <div v-if="typeof slotProps.node.data.value === 'boolean'">
            <ToggleSwitch
              :disabled="!editing"
              :model-value="slotProps.node.data.value"
              @update:model-value="(newValue: boolean) => store.setSetting(slotProps.node.key, newValue)"
            ></ToggleSwitch>
          </div>
          <div v-else-if="typeof slotProps.node.data.value === 'number'">
            <InputNumber
              :disabled="!editing"
              :model-value="slotProps.node.data.value"
              @update:model-value="(newValue: number) => store.setSetting(slotProps.node.key, newValue)"
            ></InputNumber>
          </div>
          <div v-else-if="typeof slotProps.node.data.value === 'string'">
            <InputText
              :disabled="!editing"
              :model-value="slotProps.node.data.value"
              @update:model-value="
                (newValue?: string): void => {
                  store
                    .setSetting(slotProps.node.key, (newValue ?? '') as unknown as ISettings[keyof ISettings])
                    .then(() => {});
                }
              "
            ></InputText>
          </div>
          <div v-else>{{ slotProps.node.data.value }}</div>
        </template>
      </Column>
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
import { computed, ref } from 'vue';
import Column from 'primevue/column';
import TreeTable from 'primevue/treetable';
import type { TreeNode } from 'primevue/treenode';
import AppContainer from '@/layout/AppContainer.vue';
import { useServerSettingsStore } from '@/stores/server-settings.store';
import type { ISettings } from '@/api';

const store = useServerSettingsStore();

const editing = ref<boolean>(false);

const entries = computed(() => {
  if (!store.serverSettings) return [];
  const keys = Object.keys(store.serverSettings);

  const createTreeNodes = (currentKey: string): TreeNode[] => {
    const subKeys = keys.filter((k) => k.startsWith(currentKey));

    const usedKeys: string[] = [];

    return subKeys
      .map((key): TreeNode | undefined => {
        const remainder = key.substring(currentKey.length, key.length);
        if (remainder == '') return undefined;

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
            // @ts-expect-error I do not understand this and can't be bothered anymore
            value: store.serverSettings![setting],
            isFeatureFlag: store.isFeatureFlag(setting),
          },
          children: children.length > 0 ? children : undefined,
        };
      })
      .filter((x) => x != undefined)
      .map((x) => x!);
  };
  return createTreeNodes('');
});
</script>

<style scoped>
@use '@/assets/layout/layout.scss';
</style>
