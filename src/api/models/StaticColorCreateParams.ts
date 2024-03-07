/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { StaticColorProps } from './StaticColorProps';

export type StaticColorCreateParams = BaseLightsEffectCreateParams & {
  props: StaticColorProps;
  type: StaticColorCreateParams.type;
};

export namespace StaticColorCreateParams {
  export enum type {
    STATIC_COLOR = 'StaticColor'
  }
}
