/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RgbColor } from './RgbColor';

export type SparkleProps = {
  /**
   * Colors of the lights
   */
  colors: Array<RgbColor>;
  /**
   * What percentage (on average) of the lights should be turned on
   */
  ratio?: number;
  /**
   * How many ms the light should take to slowly turn off
   */
  dimDuration?: number;
  /**
   * After how many ms (approximately) a ratio of lights should be turned on
   */
  cycleTime?: number;
};
