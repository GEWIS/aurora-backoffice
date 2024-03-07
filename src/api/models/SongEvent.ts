/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SongData } from './SongData';

export type SongEvent = {
  type: SongEvent.type;
  timestamp: number;
  data: SongData | Array<SongData>;
};

export namespace SongEvent {
  export enum type {
    SONG = 'song'
  }
}
