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
          <div v-if="slotProps.node.data.type === 'boolean'">
            <ToggleSwitch
              :disabled="!editing || !slotProps.node.data.canEdit"
              :model-value="slotProps.node.data.value"
              @update:model-value="(newValue: boolean) => store.setSetting(slotProps.node.key, newValue)"
            ></ToggleSwitch>
          </div>
          <div v-else-if="slotProps.node.data.type === 'double'">
            <InputNumber
              :disabled="!editing || !slotProps.node.data.canEdit"
              :format="false"
              :model-value="slotProps.node.data.value"
              @update:model-value="(newValue: number) => store.setSetting(slotProps.node.key, newValue)"
            ></InputNumber>
          </div>
          <div v-else-if="slotProps.node.data.type === 'integer'">
            <InputNumber
              :disabled="!editing || !slotProps.node.data.canEdit"
              :format="false"
              :model-value="slotProps.node.data.value"
              @update:model-value="(newValue: number) => store.setSetting(slotProps.node.key, newValue)"
            ></InputNumber>
          </div>
          <div v-else-if="slotProps.node.data.type === 'string'">
            <InputText
              :disabled="!editing || !slotProps.node.data.canEdit"
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
          <div v-else-if="slotProps.node.data.type === 'hexColor'" class="flex flex-row gap-2 items-center">
            <ColorPicker
              :id="`color-picker-${slotProps.node.key}`"
              :disabled="!editing || !slotProps.node.data.canEdit"
              :model-value="slotProps.node.data.value"
              @update:model-value="
                (newValue: string): void => {
                  store
                    .setSetting(slotProps.node.key, `#${newValue}` as unknown as ISettings[keyof ISettings])
                    .then(() => {});
                }
              "
            />
            <InputText
              :disabled="!editing || !slotProps.node.data.canEdit"
              :model-value="slotProps.node.data.value"
              size="small"
              @update:model-value="
                (newValue?: string): void => {
                  store
                    .setSetting(slotProps.node.key, (newValue ?? '') as unknown as ISettings[keyof ISettings])
                    .then(() => {});
                }
              "
            ></InputText>
          </div>
          <div v-else-if="slotProps.node.data.type === 'file'">
            <ServerSettingsFileUpload
              :disabled="!editing || !slotProps.node.data.canEdit"
              :model-value="slotProps.node.data.value"
              :setting="slotProps.node.key"
            />
          </div>
          <div v-else>{{ slotProps.node.data.value }}</div>
        </template>
      </Column>
      <Column field="isFeatureFlag" header="Feature flag">
        <template #body="slotProps">
          <div v-if="slotProps.node.data.isFeatureFlag && !!slotProps.node.data.value">
            <i class="pi pi-flag-fill text-green-800" title="Enabled"></i>
          </div>
          <div v-else-if="slotProps.node.data.isFeatureFlag">
            <i class="pi pi-flag text-red-800" title="Disabled"></i>
          </div>
          <div v-else></div>
        </template>
      </Column>
      <Column field="description">
        <template #body="slotProps">
          <div v-if="slotProps.node.data.description">
            <span v-tooltip="slotProps.node.data.description" class="pi pi-question-circle"></span>
          </div>
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
import { type ISettings, ISettingsSchema } from '@/api';
import ServerSettingsFileUpload from '@/components/settings/ServerSettingsFileUpload.vue';

const store = useServerSettingsStore();

const editing = ref<boolean>(false);

const entries = computed(() => {
  if (!store.serverSettings) return [];
  const keys = Object.keys(store.serverSettings);

  const createTreeNodes = (currentKey: string, canEditParent = true): TreeNode[] => {
    const subKeys = keys.filter((k) => k.startsWith(currentKey));

    const usedKeys: string[] = [];

    return subKeys
      .map((key): TreeNode | undefined => {
        const remainder = key.substring(currentKey.length, key.length);
        if (remainder == '') return undefined;

        const nextKey = currentKey + remainder.split('.')[0] + '.';
        if (usedKeys.includes(nextKey)) return undefined;

        // Current key ends with a dot, so we need to remove that dot
        const canEdit = canEditParent && store.featureEnabled(currentKey.substring(0, currentKey.length - 1));

        usedKeys.push(nextKey);
        const setting = currentKey + remainder;
        const children: TreeNode[] = createTreeNodes(nextKey);

        const refToType = (ref: string) => {
          switch (ref) {
            case '#/components/schemas/IFile':
              return 'file';
            case '#/components/schemas/HexColor':
              return 'hexColor';
            default:
              return '';
          }
        };

        let spec;
        if (setting in ISettingsSchema.properties) {
          // @ts-expect-error Hey-API needs to export a schema interface...
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          spec = ISettingsSchema.properties[setting as any] as any;
        } else {
          throw new Error(`Unknown setting in schema: "${setting}"`);
        }
        let description: string | undefined;
        if ('description' in spec) {
          description = spec.description as string;
        }
        let type: string = '';
        if ('type' in spec) {
          type = spec.type as string;
        } else if ('$ref' in spec) {
          type = refToType(spec['$ref'] as string);
        } else if ('anyOf' in spec) {
          for (const item of spec.anyOf) {
            if ('$ref' in item) {
              type = refToType(item['$ref'] as string);
              break;
            }
          }
        }

        return {
          key: setting,
          label: remainder,
          data: {
            name: remainder,
            type,
            description,
            // @ts-expect-error I do not understand this and can't be bothered anymore
            value: store.serverSettings![setting],
            isFeatureFlag: store.isFeatureFlag(setting),
            canEdit,
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
