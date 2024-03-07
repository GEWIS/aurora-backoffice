/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TrainResponse = {
  direction: string;
  plannedDateTime: string;
  delay: number;
  trainType: string;
  operator: string;
  cancelled: boolean;
  routeStations: Array<string>;
  messages: Array<{
    message: string;
    style: string;
  }>;
};
