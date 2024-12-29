import type { ErrorPoster, LocalPoster, MediaPoster, PhotoPoster } from '@/api';

/**
 * Poster state
 * @param posters - The posters
 * @param loading - Whether the poster store is loading
 */
export interface BasePosterState {
  posters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster)[];
  loading: boolean;
}

/**
 * Poster store
 * @param fetchPosters - The posters
 * @param isLoading - Whether the store is fetching the posters
 * @param isBorrelModeActive - Optional, whether the borrel mode is active
 * @method setBorrelMode - Optional, sets borrel mode to a certain value
 * @method getPosters - Get the posters from the core
 * @method reloadPosters - Reload the posters from source and retrieve from core
 */
export default interface BasePosterStore {
  fetchPosters: (LocalPoster | MediaPoster | PhotoPoster | ErrorPoster)[];
  isLoading: boolean;
  isBorrelModeActive?: boolean;
  setBorrelMode?: (enabled: boolean) => Promise<void>;
  getPosters: () => Promise<void>;
  reloadPosters: () => Promise<void>;
}
