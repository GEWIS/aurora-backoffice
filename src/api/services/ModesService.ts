/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CenturionParams } from '../models/CenturionParams';
import type { CenturionResponse } from '../models/CenturionResponse';
import type { MixTapeResponse } from '../models/MixTapeResponse';
import type { SkipCenturionRequest } from '../models/SkipCenturionRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ModesService {
  /**
   * @returns CenturionResponse Ok
   * @throws ApiError
   */
  public static getCenturion(): CancelablePromise<CenturionResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/modes/centurion',
      errors: {
        411: `Centurion not enabled`
      }
    });
  }

  /**
   * Enable Centurion mode for the given devices
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static enableCenturion(requestBody: CenturionParams): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/modes/centurion',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns any
   * @throws ApiError
   */
  public static disableCenturion(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/modes/centurion'
    });
  }

  /**
   * Start a centurion
   * @returns void
   * @throws ApiError
   */
  public static startCenturion(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/modes/centurion/start',
      errors: {
        411: `Centurion not enabled`
      }
    });
  }

  /**
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static skipCenturion(requestBody: SkipCenturionRequest): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/modes/centurion/skip',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid timestamp provided`,
        411: `Centurion nog enabled`
      }
    });
  }

  /**
   * Stop a centurion
   * @returns void
   * @throws ApiError
   */
  public static stopCenturion(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/modes/centurion/stop',
      errors: {
        411: `Centurion not enabled`
      }
    });
  }

  /**
   * @returns MixTapeResponse Ok
   * @throws ApiError
   */
  public static getCenturionTapes(): CancelablePromise<Array<MixTapeResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/modes/centurion/tapes'
    });
  }
}
