<template>
  <BasicBlock header="Shortcuts" icon="pi-file-import">
    <Menu :model="items" class="border-transparent">
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

const items = computed<IShortcutItem[]>(() => [
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
  },
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
  },
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
]);
</script>

<style scoped></style>
