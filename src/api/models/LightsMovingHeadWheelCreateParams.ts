/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LightsMovingHeadWheelCreateParams = {
  name: string;
  masterDimChannel: number;
  strobeChannel: number;
  panChannel: number;
  finePanChannel?: number;
  tiltChannel: number;
  fineTiltChannel?: number;
  movingSpeedChannel?: number;
  colorWheelChannel: number;
  colorWheelChannelValues: Array<{
    value: number;
    name: string;
  }>;
  goboWheelChannel: number;
  goboWheelChannelValues: Array<{
    value: number;
    name: string;
  }>;
  goboRotateChannel?: number;
};
