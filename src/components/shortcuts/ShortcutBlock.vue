<template>
  <BasicBlock header="Shortcuts" icon="pi-file-import">
    <div class="columns">
      <div v-for="items in menus" :key="items[0].key" class="break">
        <Menu :model="items" class="border-transparent">
          <template #submenuheader="{ item }">
            <h6 class="mb-0">{{ item.label }}</h6>
          </template>
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                <DashboardShortcutItem
                  :icon="item.icon"
                  :label="item.label"
                  :loading="item.loading"
                  :enabled="item.enabledIcon"
                  :disabled="item.disabledIcon"
                />
              </a>
            </router-link>
            <a v-else v-bind="props.action">
              <DashboardShortcutItem
                :icon="item.icon"
                :label="item.label"
                :loading="item.loading"
                :enabled="item.enabledIcon"
              />
            </a>
          </template>
        </Menu>
      </div>
    </div>
  </BasicBlock>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHandlersStore } from '@/stores/handlers.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { useCenturionStore } from '@/stores/modes/centurion.store';
import { useTimeTrailRaceStore } from '@/stores/modes/time-trail-race.store';
import { ModesService } from '@/api';
import { handleError } from '@/utils/errorHandler';
import DashboardShortcutItem from '@/components/shortcuts/ShortcutItem.vue';
import { type IShortcutItem } from '@/components/shortcuts/IShortcutItem';
import BasicBlock from '@/components/BasicBlock.vue';

const handlersStore = useHandlersStore();
const subscriberStore = useSubscriberStore();
const sceneStore = useSceneControllerStore();

const centurionModeStore = useCenturionStore();
centurionModeStore.getCurrentCenturion(true);
const timeTrailRaceModeStore = useTimeTrailRaceStore();
timeTrailRaceModeStore.getTimeTrailMode();

const sceneMenuItems = computed<IShortcutItem[]>(() =>
  sceneStore.favoriteScenes.map((s) => {
    const lightGroupIds = s.effects
      .map((e) => e.lightsGroups.map((g) => g.id))
      .flat()
      .flat()
      .filter((n1, index, all) => index === all.findIndex((n2) => n1 === n2));
    return {
      label: s.name,
      icon: 'pi-lightbulb',
      command: async () => {
        await handlersStore.setLightsHandler(lightGroupIds, 'ScenesHandler');
        await sceneStore.applyScene(s.id);
      }
    };
  })
);

const defaults: IShortcutItem[] = [
  {
    label: 'Defaults',
    items: [
      {
        label: 'Reset to defaults',
        icon: 'pi-power-off',
        command: () => {
          handlersStore.reset();
        }
      }
    ]
  }
];

const lights: IShortcutItem[] = [
  {
    label: 'Lights',
    items: [
      {
        label: 'Disable',
        icon: 'pi-power-off',
        command: () => {
          const ids = subscriberStore.lightsGroups.map((g) => g.id);
          handlersStore.setLightsHandler(ids);
        }
      },
      ...sceneMenuItems.value,
      {
        label: 'Random effects',
        icon: 'pi-sparkles',
        command: () => {
          const ids = subscriberStore.lightsGroups.map((g) => g.id);
          handlersStore.setLightsHandler(ids, 'RandomEffectsHandler');
        }
      }
    ]
  }
];

const modes: IShortcutItem[] = [
  {
    label: 'Modes',
    items: [
      {
        label: 'Disable',
        icon: 'pi-power-off',
        command: () => {
          ModesService.disableAllModes()
            .then(async () => {
              await Promise.all([
                centurionModeStore.getCurrentCenturion(),
                timeTrailRaceModeStore.getTimeTrailMode()
              ]);
            })
            .catch(handleError);
        }
      },
      {
        label: 'Centurion',
        icon: 'pi-prime',
        route: '/modes/centurion',
        loading: centurionModeStore.loading,
        enabledIcon: centurionModeStore.enabled,
        disabledIcon: centurionModeStore.disabled
      },
      {
        label: 'Spoelbakkenrace',
        icon: 'pi-hourglass',
        route: '/modes/timeTrailRace',
        loading: timeTrailRaceModeStore.loading,
        enabledIcon: timeTrailRaceModeStore.enabled,
        disabledIcon: timeTrailRaceModeStore.disabled
      }
    ]
  }
];

const menus = computed<Array<Array<IShortcutItem>>>(() => [defaults, lights, modes]);
</script>

<style lang="scss">
@import 'primeflex/core/variables';

.columns {
  columns: 1 !important;
}

@media screen and (min-width: $sm) {
  .columns {
    columns: 2 !important;
  }
}

.break {
  break-inside: avoid;
}
</style>
