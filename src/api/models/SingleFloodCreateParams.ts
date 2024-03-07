/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { SingleFloodProps } from './SingleFloodProps';

export type SingleFloodCreateParams = BaseLightsEffectCreateParams & {
  props: SingleFloodProps;
  type: SingleFloodCreateParams.type;
};

export namespace SingleFloodCreateParams {
  export enum type {
    SINGLE_FLOOD = 'SingleFlood'
  }
}
