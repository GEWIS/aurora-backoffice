/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {
  /**
   * @returns User
   * @throws ApiError
   */
  public static getInformation(): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/user/me',
      errors: {
        404: `User not found`
      }
    });
  }
}
