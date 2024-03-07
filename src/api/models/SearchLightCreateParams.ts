/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { SearchLightProps } from './SearchLightProps';

export type SearchLightCreateParams = BaseLightsEffectCreateParams & {
  props: SearchLightProps;
  type: SearchLightCreateParams.type;
};

export namespace SearchLightCreateParams {
  export enum type {
    SEARCH_LIGHT = 'SearchLight'
  }
}
