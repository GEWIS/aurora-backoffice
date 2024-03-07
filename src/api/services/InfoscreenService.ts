/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Information } from '../models/Information';
import type { InformationParams } from '../models/InformationParams';
import type { Message } from '../models/Message';
import type { MessageParams } from '../models/MessageParams';
import type { Partial_MessageParams_ } from '../models/Partial_MessageParams_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InfoscreenService {
  /**
   * @returns Information
   * @throws ApiError
   */
  public static getInformation(): CancelablePromise<Information> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/infoscreen/information'
    });
  }

  /**
   * @param requestBody
   * @returns Information
   * @throws ApiError
   */
  public static setInformation(requestBody: InformationParams): CancelablePromise<Information> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/infoscreen/information',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid Information`
      }
    });
  }

  /**
   * @returns Message
   * @throws ApiError
   */
  public static getAllMessages(): CancelablePromise<Array<Message>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/infoscreen/messages'
    });
  }

  /**
   * @param requestBody
   * @returns Message
   * @throws ApiError
   */
  public static createMessage(requestBody: MessageParams): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/infoscreen/message',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid Message`
      }
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns Message
   * @throws ApiError
   */
  public static updateMessage(
    id: string,
    requestBody: Partial_MessageParams_
  ): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/infoscreen/message/{id}',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid Message`
      }
    });
  }

  /**
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static deleteMessage(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/infoscreen/message/{id}',
      path: {
        id: id
      }
    });
  }
}
