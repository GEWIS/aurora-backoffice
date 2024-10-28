import { defineStore } from 'pinia';
import { noop } from 'lodash';
import {
  type CreateSceneParams,
  type LightsSceneResponse,
  getAllScenes,
  createScene,
  deleteScene,
  applyScene,
  clearScene
} from '@/api';

interface SceneControllerStore {
  scenes: LightsSceneResponse[];
  favoriteScenes: LightsSceneResponse[];
  loading: boolean;
}

export const useSceneControllerStore = defineStore('scene-controller', {
  state: (): SceneControllerStore => ({
    scenes: [],
    favoriteScenes: [],
    loading: true
  }),
  getters: {},
  actions: {
    async init() {
      await getAllScenes({
        query: { favorite: true }
      })
        .then((scenes) => (this.favoriteScenes = scenes.data!))
        .catch(noop);
      this.loading = false;
    },
    async fetchScenes() {
      await getAllScenes()
        .then((scenes) => {
          this.scenes = scenes.data!;
          this.favoriteScenes = scenes.data!.filter((s) => s.favorite);
        })
        .catch(noop);
    },
    async initPage() {
      this.loading = true;
      await this.fetchScenes();
      this.loading = false;
    },
    async createScene(body: CreateSceneParams) {
      this.loading = true;
      await createScene({
        body: body
      }).catch(noop);
      await this.fetchScenes();
      this.loading = false;
    },
    async deleteScene(id: number) {
      this.loading = true;
      await deleteScene({
        path: { id }
      }).catch(noop);
      await this.fetchScenes();
      this.loading = false;
    },
    async applyScene(id: number) {
      this.loading = true;
      await applyScene({
        path: { id }
      }).catch(noop);
      this.loading = false;
    },
    async clearScene() {
      this.loading = true;
      await clearScene().catch(noop);
      this.loading = false;
    }
  }
});
