import { defineStore } from 'pinia';
import type { CreateSceneParams, LightsSceneResponse } from '@/api';
import {
  type HttpApiException,
  getAllScenes,
  createScene,
  deleteScene,
  applyScene,
  clearScene
} from '@/api';
import { handleError } from '@/utils/errorHandler';

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
        .catch(handleError);
      this.loading = false;
    },
    async fetchScenes() {
      try {
        const scenes = await getAllScenes();
        this.scenes = scenes.data!;
        this.favoriteScenes = scenes.data!.filter((s) => s.favorite);
      } catch (e) {
        handleError(e as HttpApiException);
      }
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
      }).catch(handleError);
      await this.fetchScenes();
      this.loading = false;
    },
    async deleteScene(id: number) {
      this.loading = true;
      await deleteScene({
        path: { id }
      }).catch(handleError);
      await this.fetchScenes();
      this.loading = false;
    },
    async applyScene(id: number) {
      this.loading = true;
      await applyScene({
        path: { id }
      }).catch(handleError);
      this.loading = false;
    },
    async clearScene() {
      this.loading = true;
      await clearScene().catch(handleError);
      this.loading = false;
    }
  }
});
