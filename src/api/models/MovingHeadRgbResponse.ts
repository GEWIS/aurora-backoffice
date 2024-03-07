/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MovingHeadRgbResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  masterDimChannel: number;
  strobeChannel: number;
  panChannel: number;
  finePanChannel?: number | null;
  tiltChannel: number;
  fineTiltChannel?: number | null;
  movingSpeedChannel?: number | null;
  redChannel: number;
  blueChannel: number;
  greenChannel: number;
  coldWhiteChannel?: number | null;
  warmWhiteChannel?: number | null;
  amberChannel?: number | null;
  uvChannel?: number | null;
};
