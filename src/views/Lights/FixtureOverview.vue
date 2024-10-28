<template>
  <AppContainer icon="pi pi-fw pi-bolt" title="Fixture Overview">
    <div>
      <DataTable
        v-model:expanded-rows="expandedRows"
        data-key="id"
        :value="subscriberStore.lightsGroups"
      >
        <template #header>
          <div class="flex flex-wrap justify-end gap-5">
            <Button icon="pi pi-plus" label="Expand All" text @click="expandAll" />
            <Button icon="pi pi-minus" label="Collapse All" text @click="collapseAll" />
          </div>
        </template>
        <Column expander style="width: 5rem" />
        <Column field="name" header="Group name" />
        <Column header="Controller">
          <template #body="slotProps">
            {{ slotProps.data.controller.name }}
          </template>
        </Column>
        <Column header="Current handler">
          <template #body="slotProps">
            <span v-if="activeLightsGroupIds.has(slotProps.data.id)">
              {{ getHandler(slotProps.data.id) }}
            </span>
            <InlineMessage v-else severity="warn">
              No handler set, all actions disabled
            </InlineMessage>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex flex-row gap-1">
              <Button
                :disabled="!activeLightsGroupIds.has(slotProps.data.id)"
                size="small"
                title="Freeze"
                @click="
                  async () => {
                    await freezeLightsGroup({ path: { id: slotProps.data.id } });
                    toastSuccess({
                      title: 'Success',
                      body: `Successfully froze lights group '${slotProps.data.name}'`
                    });
                  }
                "
              >
                <i class="pi pi-pause" />
              </Button>
              <Button
                :disabled="!activeLightsGroupIds.has(slotProps.data.id)"
                size="small"
                title="Unfreeze"
                @click="
                  async () => {
                    await unfreezeLightsGroup({ path: { id: slotProps.data.id } });
                    toastSuccess({
                      title: 'Success',
                      body: `Successfully unfroze lights group '${slotProps.data.name}'`
                    });
                  }
                "
              >
                <i class="pi pi-play" />
              </Button>
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <h3>Fixtures for {{ slotProps.data.name }}</h3>
          <DataTable :value="getGroupFixtures(slotProps.data)">
            <Column header="Name">
              <template #body="slotProps2">
                {{ slotProps2.data.fixture.name }}
              </template>
            </Column>
            <Column field="firstChannel" header="DMX Channel" />
            <Column header="Actions">
              <template #body="slotProps2">
                <div class="flex flex-row gap-1">
                  <Button
                    :disabled="!activeLightsGroupIds.has(slotProps.data.id)"
                    size="small"
                    title="Freeze"
                    @click="handleFreeze(slotProps2.data.type, slotProps2.data.id)"
                  >
                    <i class="pi pi-pause" />
                  </Button>
                  <Button
                    :disabled="!activeLightsGroupIds.has(slotProps.data.id)"
                    size="small"
                    title="Unfreeze"
                    @click="handleUnfreeze(slotProps2.data.type, slotProps2.data.id)"
                  >
                    <i class="pi pi-play" />
                  </Button>
                  <Button
                    :disabled="
                      !activeLightsGroupIds.has(slotProps.data.id) ||
                      !slotProps2.data.fixture.canReset
                    "
                    size="small"
                    title="Hardware reset"
                    @click="handleHardwareReset(slotProps2.data.type, slotProps2.data.id)"
                  >
                    <i class="pi pi-sync" />
                  </Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { noop } from 'lodash';
import { useHandlersStore } from '@/stores/handlers.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import {
  freezeGroupMovingHeadRgb,
  freezeGroupMovingHeadWheel,
  freezeGroupPar,
  freezeLightsGroup,
  type LightsGroupResponse,
  resetGroupMovingHeadRgb,
  resetGroupMovingHeadWheel,
  resetGroupPar,
  unfreezeGroupPar,
  unfreezeLightsGroup,
  unfreezeMovingHeadRgb,
  unfreezeMovingHeadWheel
} from '@/api';
import { FixtureType } from '@/components/lights/fixtures/FixtureType';
import { toastSuccess } from '@/utils/toastHandler';
import AppContainer from '@/layout/AppContainer.vue';

const handlersStore = useHandlersStore();
const subscriberStore = useSubscriberStore();

const expandedRows = ref<Record<number, boolean> | null>({});
const expandAll = () => {
  expandedRows.value = subscriberStore.lightsGroups.reduce(
    (rows: Record<number, boolean>, group: LightsGroupResponse) => (rows[group.id] ? rows : {}),
    {}
  );
};
const collapseAll = () => {
  expandedRows.value = null;
};

const getGroupFixtures = (g: LightsGroupResponse) =>
  [
    ...g.pars.map((p) => ({ ...p, type: FixtureType.PAR })),
    ...g.movingHeadRgbs.map((m) => ({ ...m, type: FixtureType.MOVING_HEAD_RGB })),
    ...g.movingHeadWheels.map((m) => ({ ...m, type: FixtureType.MOVING_HEAD_WHEEL }))
  ].sort((a, b) => a.firstChannel - b.firstChannel);

const handleFreeze = async (type: FixtureType, id: number) => {
  switch (type) {
    case FixtureType.PAR:
      await freezeGroupPar({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_RGB:
      await freezeGroupMovingHeadRgb({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_WHEEL:
      await freezeGroupMovingHeadWheel({ path: { id } }).catch(noop);
      break;
  }
  toastSuccess({
    title: 'Success',
    body: 'Successfully froze fixture'
  });
};

const handleUnfreeze = async (type: FixtureType, id: number) => {
  switch (type) {
    case FixtureType.PAR:
      await unfreezeGroupPar({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_RGB:
      await unfreezeMovingHeadRgb({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_WHEEL:
      await unfreezeMovingHeadWheel({ path: { id } }).catch(noop);
      break;
  }
  toastSuccess({
    title: 'Success',
    body: 'Successfully unfroze fixture'
  });
};

const handleHardwareReset = async (type: FixtureType, id: number) => {
  switch (type) {
    case FixtureType.PAR:
      await resetGroupPar({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_RGB:
      await resetGroupMovingHeadRgb({ path: { id } }).catch(noop);
      break;
    case FixtureType.MOVING_HEAD_WHEEL:
      await resetGroupMovingHeadWheel({ path: { id } }).catch(noop);
      break;
  }
  toastSuccess({
    title: 'Success',
    body: 'Successfully sent hardware reset signal'
  });
};

const getHandler = (groupId: number): string | undefined => {
  return handlersStore.lightsHandlers.find((h) => !!h.entities.find((e) => e.id === groupId))?.name;
};

const activeLightsGroupIds = computed((): Set<number> => {
  const ids = handlersStore.lightsHandlers.map((h) => h.entities.map((e) => e.id)).flat();
  return new Set(ids);
});
</script>

<style scoped></style>
