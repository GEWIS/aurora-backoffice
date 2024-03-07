/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtificialBeatGeneratorParams } from '../models/ArtificialBeatGeneratorParams';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ArtificialBeatGeneratorService {
  /**
   * @returns any Ok
   * @throws ApiError
   */
  public static getArtificalBeatGenerator(): CancelablePromise<ArtificialBeatGeneratorParams | null> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/beat-generator'
    });
  }

  /**
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static startArtificialBeatGenerator(
    requestBody: ArtificialBeatGeneratorParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/beat-generator',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns void
   * @throws ApiError
   */
  public static stopArtificialBeatGenerator(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/beat-generator'
    });
  }
}
