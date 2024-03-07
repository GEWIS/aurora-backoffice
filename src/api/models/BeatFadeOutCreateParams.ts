/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { BeatFadeOutProps } from './BeatFadeOutProps';

export type BeatFadeOutCreateParams = BaseLightsEffectCreateParams & {
  props: BeatFadeOutProps;
  type: BeatFadeOutCreateParams.type;
};

export namespace BeatFadeOutCreateParams {
  export enum type {
    BEAT_FADE_OUT = 'BeatFadeOut'
  }
}
