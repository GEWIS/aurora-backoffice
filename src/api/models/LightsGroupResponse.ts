/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LightsControllerResponse } from './LightsControllerResponse';
import type { MovingHeadRgbResponse } from './MovingHeadRgbResponse';
import type { MovingHeadWheelResponse } from './MovingHeadWheelResponse';
import type { ParResponse } from './ParResponse';

export type LightsGroupResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  controller: LightsControllerResponse;
  pars: Array<ParResponse>;
  movingHeadRgbs: Array<MovingHeadRgbResponse>;
  movingHeadWheels: Array<MovingHeadWheelResponse>;
};
