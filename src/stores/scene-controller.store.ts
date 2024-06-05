import { defineStore } from 'pinia';
import type { CreateSceneParams, LightsSceneResponse } from '@/api';
import { ApiError, HandlersService } from '@/api';
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
      await HandlersService.getAllScenes(true)
        .then((r: LightsSceneResponse[]) => (this.favoriteScenes = r))
        .catch(handleError);
      this.loading = false;
    },
    async fetchScenes() {
      try {
        const scenes = await HandlersService.getAllScenes();
        this.scenes = scenes;
        this.favoriteScenes = scenes.filter((s) => s.favorite);
      } catch (e) {
        handleError(e as ApiError);
      }
    },
    async initPage() {
      this.loading = true;
      await this.fetchScenes();
      this.loading = false;
    },
    async createScene(body: CreateSceneParams) {
      this.loading = true;
      await HandlersService.createScene(body).catch(handleError);
      await this.fetchScenes();
      this.loading = false;
    },
    async deleteScene(id: number) {
      this.loading = true;
      await HandlersService.deleteScene(id).catch(handleError);
      await this.fetchScenes();
      this.loading = false;
    },
    async applyScene(id: number) {
      this.loading = true;
      await HandlersService.applyScene(id).catch(handleError);
      this.loading = false;
    },
    async clearScene() {
      this.loading = true;
      await HandlersService.clearScene().catch(handleError);
      this.loading = false;
    }
  }
});
