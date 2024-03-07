/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AlcoholTime } from './AlcoholTime';
import type { RoomStatus } from './RoomStatus';

export type Information = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  roomStatus: RoomStatus;
  alcoholTime: AlcoholTime;
  firstResponsible: string;
  secondResponsible?: string;
  firstERO?: string;
  secondERO?: string;
};
