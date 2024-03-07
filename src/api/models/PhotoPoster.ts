/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasePoster } from './BasePoster';
import type { PosterType_PHOTO } from './PosterType_PHOTO';

export type PhotoPoster = BasePoster & {
  albums: Array<number>;
  type: PosterType_PHOTO;
};
