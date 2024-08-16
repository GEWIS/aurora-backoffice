<template>
  <BasicBlock title="Scenes" icon="pi-sliders-h">
    <template #header>
      <div class="flex flex-row gap-3 align-items-center">
        <Button>
          <i class="pi pi-moon mr-2" />
          Clear scenes
        </Button>
        <BeatVisualizer />
      </div>
    </template>
    <DataTable :value="store.scenes" :loading="store.loading">
      <Column field="name" header="Name" />
      <Column field="favorite" header="Favorite">
        <template #body="slotProps">
          <i class="pi pi-check" v-if="slotProps.data.favorite" />
          <i class="pi pi-times" v-else />
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex flex-row gap-1">
            <Button size="small" title="Apply scene" @click="store.applyScene(slotProps.data.id)">
              <i class="pi pi-lightbulb" />
            </Button>
            <SceneDeleteButton :id="slotProps.data.id" />
          </div>
        </template>
      </Column>
    </DataTable>
  </BasicBlock>
</template>

<script setup lang="ts">
import BeatVisualizer from '@/components/audio/BeatVisualizer.vue';
import { useSceneControllerStore } from '@/stores/scene-controller.store';
import SceneDeleteButton from '@/components/lights/scenes/SceneDeleteButton.vue';
import BasicBlock from '@/components/BasicBlock.vue';

const store = useSceneControllerStore();
store.initPage();
</script>

<style lang="scss">
@use '@/assets/layout/layout.scss';

th {
  @extend h6;
}
</style>
