/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserProfile = {
  name: string;
  roles: Array<string>;
  audioId?: number;
  lightsControllerId?: number;
  screenId?: number;
  country: string;
  explicit_content: {
    filter_locked: boolean;
    filter_enabled: boolean;
  };
  product: string;
};
