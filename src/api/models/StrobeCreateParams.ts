/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { StrobeProps } from './StrobeProps';

export type StrobeCreateParams = BaseLightsEffectCreateParams & {
  props: StrobeProps;
  type: StrobeCreateParams.type;
};

export namespace StrobeCreateParams {
  export enum type {
    STROBE = 'Strobe'
  }
}
