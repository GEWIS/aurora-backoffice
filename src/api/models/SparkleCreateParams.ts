/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { SparkleProps } from './SparkleProps';

export type SparkleCreateParams = BaseLightsEffectCreateParams & {
  props: SparkleProps;
  type: SparkleCreateParams.type;
};

export namespace SparkleCreateParams {
  export enum type {
    SPARKLE = 'Sparkle'
  }
}
