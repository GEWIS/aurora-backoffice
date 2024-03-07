/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BasePoster } from './BasePoster';
import type { PosterType_EXTERNAL } from './PosterType_EXTERNAL';
import type { PosterType_IMAGE } from './PosterType_IMAGE';
import type { PosterType_VIDEO } from './PosterType_VIDEO';

export type MediaPoster = BasePoster & {
  source: Array<string>;
  type: PosterType_IMAGE | PosterType_VIDEO | PosterType_EXTERNAL;
};
