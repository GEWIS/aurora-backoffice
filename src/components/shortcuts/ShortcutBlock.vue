<template>
  <Menu :model="items" class="p-panel pt-0">
    <template #start>
      <div class="p-panel-header border-right-none border-left-none border-top-none mb-2">
        <div class="p-panel-title uppercase">
          <FontAwesomeIcon
            :icon="faShareFromSquare"
            class="mr-1 text-xl"
            :style="{ marginTop: '-0.25rem', marginBottom: '-0.15rem' }"
          />
          Shortcuts
        </div>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <DashboardShortcutItem
            :icon="item.faIcon"
            :label="item.label"
            :loading="item.loading"
            :enabled="item.enabledIcon"
            :disabled="item.disabledIcon"
          />
        </a>
      </router-link>
      <a v-else v-bind="props.action">
        <DashboardShortcutItem
          :icon="item.faIcon"
          :label="item.label"
          :loading="item.loading"
          :enabled="item.enabledIcon"
        />
      </a>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faDice,
  faHelmetSafety,
  faLightbulb,
  faPowerOff,
  faShareFromSquare,
  faStopwatch
} from '@fortawesome/free-solid-svg-icons';
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
      faIcon: faLightbulb,
      command: async () => {
        await handlersStore.setLightsHandler(lightGroupIds, 'ScenesHandler');
        await sceneStore.applyScene(s.id);
      }
    };
  })
);

const items = computed<IShortcutItem[]>(() => [
  {
    label: 'Reset to defaults',
    faIcon: faPowerOff,
    command: () => {
      handlersStore.reset();
    }
  },
  {
    separator: true
  },
  {
    label: 'Lights',
    items: [
      {
        label: 'Disable',
        faIcon: faPowerOff,
        command: () => {
          const ids = subscriberStore.lightsGroups.map((g) => g.id);
          handlersStore.setLightsHandler(ids);
        }
      },
      ...sceneMenuItems.value,
      {
        label: 'Random effects',
        faIcon: faDice,
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
        faIcon: faPowerOff,
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
        faIcon: faHelmetSafety,
        route: '/modes/centurion',
        loading: centurionModeStore.loading,
        enabledIcon: centurionModeStore.enabled,
        disabledIcon: centurionModeStore.disabled
      },
      {
        label: 'Spoelbakkenrace',
        faIcon: faStopwatch,
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
