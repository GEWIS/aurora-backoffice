/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasePoster } from './BasePoster';
import type { PosterType_ERROR } from './PosterType_ERROR';

export type ErrorPoster = BasePoster & {
  message: string;
  type: PosterType_ERROR;
};
