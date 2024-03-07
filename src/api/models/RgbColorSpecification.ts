/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RgbColor } from './RgbColor';
import type { RgbColorDefinition } from './RgbColorDefinition';
import type { WheelColor } from './WheelColor';

export type RgbColorSpecification = {
  hex: string;
  complementary: Array<RgbColor>;
  alternative: WheelColor;
  definition: RgbColorDefinition;
};
