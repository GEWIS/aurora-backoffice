/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseLightsEffectCreateParams } from './BaseLightsEffectCreateParams';
import type { TableRotateProps } from './TableRotateProps';

export type TableRotateCreateParams = BaseLightsEffectCreateParams & {
  props: TableRotateProps;
  type: TableRotateCreateParams.type;
};

export namespace TableRotateCreateParams {
  export enum type {
    TABLE_ROTATE = 'TableRotate'
  }
}
