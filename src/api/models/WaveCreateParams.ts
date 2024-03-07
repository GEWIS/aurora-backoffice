/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { WaveProps } from './WaveProps';

export type WaveCreateParams = BaseLightsEffectCreateParams & {
  props: WaveProps;
  type: WaveCreateParams.type;
};

export namespace WaveCreateParams {
  export enum type {
    WAVE = 'Wave'
  }
}
