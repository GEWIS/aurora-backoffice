/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AudioCreateParams } from '../models/AudioCreateParams';
import type { AudioResponse } from '../models/AudioResponse';
import type { SetAudioPlayingParams } from '../models/SetAudioPlayingParams';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AudiosService {
  /**
   * @returns AudioResponse Ok
   * @throws ApiError
   */
  public static getAudios(): CancelablePromise<Array<AudioResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/audio'
    });
  }

  /**
   * @param requestBody
   * @returns AudioResponse Ok
   * @throws ApiError
   */
  public static createAudio(requestBody: AudioCreateParams): CancelablePromise<AudioResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/audio',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setAudioPlaying(
    id: number,
    requestBody: SetAudioPlayingParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/audio/{id}/playing',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
