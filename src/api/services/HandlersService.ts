/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSceneParams } from '../models/CreateSceneParams';
import type { HandlerResponse_AudioResponse_ } from '../models/HandlerResponse_AudioResponse_';
import type { HandlerResponse_LightsGroupResponse_ } from '../models/HandlerResponse_LightsGroupResponse_';
import type { HandlerResponse_ScreenResponse_ } from '../models/HandlerResponse_ScreenResponse_';
import type { LightsEffectsColorCreateParams } from '../models/LightsEffectsColorCreateParams';
import type { LightsEffectsMovementCreateParams } from '../models/LightsEffectsMovementCreateParams';
import type { LightsSceneResponse } from '../models/LightsSceneResponse';
import type { NewHandlerParams } from '../models/NewHandlerParams';
import type { SceneFixtureParams } from '../models/SceneFixtureParams';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HandlersService {
  /**
   * @returns LightsSceneResponse Ok
   * @throws ApiError
   */
  public static getAllScenes(): CancelablePromise<Array<LightsSceneResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/handler/lights/scenes'
    });
  }

  /**
   * Create a new scene
   * @param requestBody
   * @returns any Ok
   * @throws ApiError
   */
  public static createScene(requestBody: CreateSceneParams): CancelablePromise<
    | LightsSceneResponse
    | {
        missingMovingHeadWheels: Array<SceneFixtureParams>;
        missingMovingHeadRgbs: Array<SceneFixtureParams>;
        missingPars: Array<SceneFixtureParams>;
        message: string;
      }
  > {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/lights/scenes',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @param id
   * @returns LightsSceneResponse Ok
   * @throws ApiError
   */
  public static getSingleScene(id: number): CancelablePromise<LightsSceneResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/handler/lights/scenes/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static deleteScene(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/handler/lights/scenes/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * Apply the current scene to all lights that are registered to the ScenesHandler
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static applyScene(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/lights/scenes/{id}/apply',
      path: {
        id: id
      }
    });
  }

  /**
   * Given a list of color effects to create, add the given effects to the lightsgroup with the
   * given ID. Remove all color effects if an empty array is given
   * @param id
   * @param requestBody
   * @returns any Ok
   * @throws ApiError
   */
  public static applyLightsEffectColor(
    id: number,
    requestBody: Array<LightsEffectsColorCreateParams>
  ): CancelablePromise<{
    message: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/lights/set-effects/{id}/color',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * Given a list of movement effects to create, add the given effects to the lightsgroup with the
   * given ID. Remove all movement effects if an empty array is given
   * @param id
   * @param requestBody
   * @returns any Ok
   * @throws ApiError
   */
  public static applyLightsEffectMovement(
    id: number,
    requestBody: Array<LightsEffectsMovementCreateParams>
  ): CancelablePromise<{
    message: string;
  }> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/lights/set-effects/{id}/movement',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns HandlerResponse_AudioResponse_ Ok
   * @throws ApiError
   */
  public static getAudioHandlers(): CancelablePromise<Array<HandlerResponse_AudioResponse_>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/handler/audio'
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setAudioHandler(
    id: number,
    requestBody: NewHandlerParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/audio/{id}',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns HandlerResponse_LightsGroupResponse_ Ok
   * @throws ApiError
   */
  public static getLightsHandlers(): CancelablePromise<
    Array<HandlerResponse_LightsGroupResponse_>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/handler/lights'
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setLightsHandler(
    id: number,
    requestBody: NewHandlerParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/lights/{id}',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns HandlerResponse_ScreenResponse_ Ok
   * @throws ApiError
   */
  public static getScreenHandlers(): CancelablePromise<Array<HandlerResponse_ScreenResponse_>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/handler/screen'
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setScreenHandler(
    id: number,
    requestBody: NewHandlerParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/handler/screen/{id}',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }
}
