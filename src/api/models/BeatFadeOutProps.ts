/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RgbColor } from './RgbColor';

export type BeatFadeOutProps = {
  /**
   * One or more colors that should be shown
   */
  colors: Array<RgbColor>;
  /**
   * Whether the lights should be turned off using a fade effect
   * on each beat
   */
  enableFade?: boolean;
  /**
   * How many "black" fixtures should be added. Zero for no blacks
   */
  nrBlacks?: number;
  /**
   * Amount of time it takes before the lights switch to the next state (in ms). If undefined,
   * beats will be used for switching states
   */
  customCycleTime?: number;
};
