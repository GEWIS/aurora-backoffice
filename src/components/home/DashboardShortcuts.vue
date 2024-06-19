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
      <a class="flex flex-center gap-2" v-bind="props.action">
        <font-awesome-icon v-if="item.icon !== undefined" :icon="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPersonRunning,
  faPersonWalking,
  faPowerOff,
  faShareFromSquare
} from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';
import { useHandlersStore } from '@/stores/handlers.store';
import { useSubscriberStore } from '@/stores/subscriber.store';
import type { MenuItem } from 'primevue/menuitem';
import { useSceneControllerStore } from '@/stores/scene-controller.store';

const handlersStore = useHandlersStore();
const subscriberStore = useSubscriberStore();
const sceneStore = useSceneControllerStore();

const sceneMenuItems = computed<MenuItem[]>(() =>
  sceneStore.favoriteScenes.map((s) => {
    const lightGroupIds = s.effects
      .map((e) => e.lightsGroups.map((g) => g.id))
      .flat()
      .flat()
      .filter((n1, index, all) => index === all.findIndex((n2) => n1 === n2));
    return {
      label: s.name,
      icon: faPersonWalking as any as string,
      command: async () => {
        await handlersStore.setLightsHandler(lightGroupIds, 'ScenesHandler');
        await sceneStore.applyScene(s.id);
      }
    };
  })
);

const items = computed<MenuItem[]>(() => [
  {
    label: 'Reset to defaults',
    icon: faPowerOff as any as string,
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
        icon: faPowerOff as any as string,
        command: () => {
          const ids = subscriberStore.lightsGroups.map((g) => g.id);
          handlersStore.setLightsHandler(ids);
        }
      },
      ...sceneMenuItems.value,
      {
        label: 'Random effects',
        icon: faPersonRunning as any as string,
        command: () => {
          const ids = subscriberStore.lightsGroups.map((g) => g.id);
          handlersStore.setLightsHandler(ids, 'RandomEffectsHandler');
        }
      }
    ]
  }
]);
</script>

<style scoped></style>
