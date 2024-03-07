/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiKeyParameters } from '../models/ApiKeyParameters';
import type { OidcConfig } from '../models/OidcConfig';
import type { OidcParameters } from '../models/OidcParameters';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthenticationService {
  /**
   * @returns OidcConfig Ok
   * @throws ApiError
   */
  public static getOidcParameters(): CancelablePromise<OidcConfig> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/auth/oidc'
    });
  }

  /**
   * @param requestBody
   * @returns User Success
   * @throws ApiError
   */
  public static authOidc(requestBody: OidcParameters): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/oidc',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @param requestBody
   * @returns User Success
   * @throws ApiError
   */
  public static authMock(requestBody?: User): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/mock',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @param requestBody
   * @returns User Success
   * @throws ApiError
   */
  public static authKey(requestBody?: ApiKeyParameters): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/auth/key',
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
