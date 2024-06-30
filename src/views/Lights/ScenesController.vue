<template>
  <div class="page-container">
    <div class="page-title flex flex-row align-items-end justify-content-between">
      <span>Scenes Controller</span>
      <div class="flex flex-row gap-3 align-items-center">
        <Button>
          <FontAwesomeIcon :icon="faMoon" class="mr-2" />
          Clear scenes
        </Button>
        <BeatVisualizer />
      </div>
    </div>
    <div>
      <DataTable :value="store.scenes" :loading="store.loading">
        <Column field="name" header="Name" />
        <Column field="favorite" header="Favorite">
          <template #body="slotProps">
            <FontAwesomeIcon :icon="faCheck" v-if="slotProps.data.favorite" />
            <FontAwesomeIcon :icon="faCross" v-else />
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex flex-row gap-1">
              <Button size="small" title="Apply scene" @click="store.applyScene(slotProps.data.id)">
                <FontAwesomeIcon :icon="faLightbulb" />
              </Button>
              <SceneDeleteButton :id="slotProps.data.id" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import BeatVisualizer from '@/components/audio/BeatVisualizer.vue';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faCross, faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons';
import SceneDeleteButton from '@/components/lights/scenes/SceneDeleteButton.vue';

const store = useSceneControllerStore();
store.initPage();
</script>

<style scoped></style>
