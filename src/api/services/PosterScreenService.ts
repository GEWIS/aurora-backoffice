/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GEWISPhotoAlbumParams } from '../models/GEWISPhotoAlbumParams';
import type { PhotoResponse } from '../models/PhotoResponse';
import type { Poster } from '../models/Poster';
import type { TrainResponse } from '../models/TrainResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PosterScreenService {
  /**
   * @returns Poster Ok
   * @throws ApiError
   */
  public static getPosters(): CancelablePromise<Array<Poster>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/screen/poster'
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public static forceUpdatePosters(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/screen/poster/force-update'
    });
  }

  /**
   * @returns TrainResponse Ok
   * @throws ApiError
   */
  public static getTrains(): CancelablePromise<Array<TrainResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/screen/poster/train-departures'
    });
  }

  /**
   * @param requestBody
   * @returns PhotoResponse Ok
   * @throws ApiError
   */
  public static getPhoto(requestBody: GEWISPhotoAlbumParams): CancelablePromise<PhotoResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/screen/poster/photo',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
