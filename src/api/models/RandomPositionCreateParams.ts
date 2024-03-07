/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { RandomPositionProps } from './RandomPositionProps';

export type RandomPositionCreateParams = BaseLightsEffectCreateParams & {
  props: RandomPositionProps;
  type: RandomPositionCreateParams.type;
};

export namespace RandomPositionCreateParams {
  export enum type {
    RANDOM_POSITION = 'RandomPosition'
  }
}
