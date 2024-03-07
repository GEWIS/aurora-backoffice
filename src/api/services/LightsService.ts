/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GroupFixtureOverrideParams } from '../models/GroupFixtureOverrideParams';
import type { LightsColorResponse } from '../models/LightsColorResponse';
import type { LightsControllerCreateParams } from '../models/LightsControllerCreateParams';
import type { LightsControllerResponse } from '../models/LightsControllerResponse';
import type { LightsGroupCreateParams } from '../models/LightsGroupCreateParams';
import type { LightsGroupResponse } from '../models/LightsGroupResponse';
import type { LightsMovingHeadRgbCreateParams } from '../models/LightsMovingHeadRgbCreateParams';
import type { LightsMovingHeadWheelCreateParams } from '../models/LightsMovingHeadWheelCreateParams';
import type { LightsParCreateParams } from '../models/LightsParCreateParams';
import type { MovingHeadRgbResponse } from '../models/MovingHeadRgbResponse';
import type { MovingHeadWheelResponse } from '../models/MovingHeadWheelResponse';
import type { ParResponse } from '../models/ParResponse';
import type { StrobeProps } from '../models/StrobeProps';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LightsService {
  /**
   * @returns LightsControllerResponse Ok
   * @throws ApiError
   */
  public static getLightsControllers(): CancelablePromise<Array<LightsControllerResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/controller'
    });
  }

  /**
   * @param requestBody
   * @returns LightsControllerResponse Ok
   * @throws ApiError
   */
  public static createLightsController(
    requestBody: LightsControllerCreateParams
  ): CancelablePromise<LightsControllerResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/controller',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @param id
   * @returns LightsControllerResponse Ok
   * @throws ApiError
   */
  public static getSingleLightsController(id: number): CancelablePromise<LightsControllerResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/controller/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * @returns LightsGroupResponse Ok
   * @throws ApiError
   */
  public static getLightsGroups(): CancelablePromise<Array<LightsGroupResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/group'
    });
  }

  /**
   * @param id
   * @returns LightsGroupResponse Ok
   * @throws ApiError
   */
  public static getSingleLightsGroup(id: number): CancelablePromise<LightsGroupResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/group/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * @param controllerId
   * @param requestBody
   * @returns LightsGroupResponse Ok
   * @throws ApiError
   */
  public static createLightsGroup(
    controllerId: number,
    requestBody: LightsGroupCreateParams
  ): CancelablePromise<LightsGroupResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/controller/{controllerId}/group',
      path: {
        controllerId: controllerId
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns ParResponse Ok
   * @throws ApiError
   */
  public static getAllLightsPars(): CancelablePromise<Array<ParResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/fixture/par'
    });
  }

  /**
   * @param requestBody
   * @returns ParResponse Ok
   * @throws ApiError
   */
  public static createLightsPar(
    requestBody: LightsParCreateParams
  ): CancelablePromise<ParResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/fixture/par',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns MovingHeadRgbResponse Ok
   * @throws ApiError
   */
  public static getAllLightsMovingHeadsRgb(): CancelablePromise<Array<MovingHeadRgbResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/fixture/moving-head/rgb'
    });
  }

  /**
   * @param requestBody
   * @returns MovingHeadRgbResponse Ok
   * @throws ApiError
   */
  public static createLightsMovingHeadRgb(
    requestBody: LightsMovingHeadRgbCreateParams
  ): CancelablePromise<MovingHeadRgbResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/fixture/moving-head/rgb',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns MovingHeadWheelResponse Ok
   * @throws ApiError
   */
  public static getAllLightsMovingHeadsWheel(): CancelablePromise<Array<MovingHeadWheelResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/fixture/moving-head/wheel'
    });
  }

  /**
   * @param requestBody
   * @returns MovingHeadWheelResponse Ok
   * @throws ApiError
   */
  public static createLightsMovingHeadWheel(
    requestBody: LightsMovingHeadWheelCreateParams
  ): CancelablePromise<MovingHeadWheelResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/fixture/moving-head/wheel',
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * @returns string Ok
   * @throws ApiError
   */
  public static getAllLightsEffects(): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/effects'
    });
  }

  /**
   * @returns LightsColorResponse Ok
   * @throws ApiError
   */
  public static getAllLightsColors(): CancelablePromise<Array<LightsColorResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/lights/colors'
    });
  }

  /**
   * Enable the strobe for all fixtures in the given group
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static enableStrobeOnLightsGroup(
    id: number,
    requestBody?: StrobeProps
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/{id}/strobe/enable',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * Disable the strobe for all fixtures in the given group
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static disableStrobeOnLightsGroup(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/{id}/strobe/disable',
      path: {
        id: id
      }
    });
  }

  /**
   * Store the next state of all fixtures in the given LightsGroup and do not change them anymore
   * (i.e. freeze the fixture in its current state)
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static freezeLightsGroup(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/{id}/freeze',
      path: {
        id: id
      }
    });
  }

  /**
   * Unfreeze the DMX values
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static unfreezeLightsGroup(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/{id}/unfreeze',
      path: {
        id: id
      }
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setGroupParOverride(
    id: number,
    requestBody: GroupFixtureOverrideParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/par/{id}/override',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * Perform the fixture's internal reset operation if possible. Do nothing otherwise
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static resetGroupPar(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/par/{id}/reset',
      path: {
        id: id
      }
    });
  }

  /**
   * Store the next state of the fixture and do not change anymore
   * (i.e. freeze the fixture in its current state)
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static freezeGroupPar(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/par/{id}/freeze',
      path: {
        id: id
      }
    });
  }

  /**
   * Unfreeze the DMX values
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static unfreezeGroupPar(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/par/{id}/unfreeze',
      path: {
        id: id
      }
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setGroupMovingHeadRgbOverride(
    id: number,
    requestBody: GroupFixtureOverrideParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-rgb/{id}/override',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * Perform the fixture's internal reset operation if possible. Do nothing otherwise
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static resetGroupMovingHeadRgb(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-rgb/{id}/reset',
      path: {
        id: id
      }
    });
  }

  /**
   * Store the next state of the fixture and do not change anymore
   * (i.e. freeze the fixture in its current state)
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static freezeGroupMovingHeadRgb(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-rgb/{id}/freeze',
      path: {
        id: id
      }
    });
  }

  /**
   * Unfreeze the DMX values
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static unfreezeMovingHeadRgb(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-rgb/{id}/unfreeze',
      path: {
        id: id
      }
    });
  }

  /**
   * @param id
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static setGroupMovingHeadWheelOverride(
    id: number,
    requestBody: GroupFixtureOverrideParams
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-wheel/{id}/override',
      path: {
        id: id
      },
      body: requestBody,
      mediaType: 'application/json'
    });
  }

  /**
   * Perform the fixture's internal reset operation if possible. Do nothing otherwise
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static resetGroupMovingHeadWheel(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-wheel/{id}/reset',
      path: {
        id: id
      }
    });
  }

  /**
   * Store the next state of the fixture and do not change anymore
   * (i.e. freeze the fixture in its current state)
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static freezeGroupMovingHeadWheel(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-wheel/{id}/freeze',
      path: {
        id: id
      }
    });
  }

  /**
   * Unfreeze the DMX values
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static unfreezeMovingHeadWheel(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/lights/group/moving-head-wheel/{id}/unfreeze',
      path: {
        id: id
      }
    });
  }
}
