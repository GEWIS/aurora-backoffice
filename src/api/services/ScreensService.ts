/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScreenCreateParams } from '../models/ScreenCreateParams';
import type { ScreenResponse } from '../models/ScreenResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScreensService {
  /**
   * @returns ScreenResponse Ok
   * @throws ApiError
   */
  public static getScreens(): CancelablePromise<Array<ScreenResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/screen'
    });
  }

  /**
   * @param requestBody
   * @returns ScreenResponse Ok
   * @throws ApiError
   */
  public static createScreen(requestBody: ScreenCreateParams): CancelablePromise<ScreenResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/screen',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
