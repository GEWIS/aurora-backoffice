/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HornEvent } from './HornEvent';
import type { SongEvent } from './SongEvent';

export type MixTapeResponse = {
  /**
   * Unique name of the tape
   */
  name: string;
  /**
   * Relative or absolute HTTP path to the cover image
   */
  coverUrl: string;
  events: Array<HornEvent | SongEvent>;
  /**
   * Amount of horns
   */
  horns: number;
  /**
   * Duration of the mix tape
   */
  duration: number;
};
