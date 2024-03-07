/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HornData } from './HornData';

export type HornEvent = {
  type: HornEvent.type;
  timestamp: number;
  data: HornData;
};

export namespace HornEvent {
  export enum type {
    HORN = 'horn'
  }
}
