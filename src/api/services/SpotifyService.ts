/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SpotifyUserResponse } from '../models/SpotifyUserResponse';
import type { TrackChangeEvent } from '../models/TrackChangeEvent';
import type { UserProfile } from '../models/UserProfile';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SpotifyService {
  /**
   * Login a user via Spotify. Used to bind the returned spotify user to this server instance.
   * Performs a redirect to the Spotify website
   * @returns void
   * @throws ApiError
   */
  public static spotifyLogin(): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/login'
    });
  }

  /**
   * @param state
   * @param code
   * @param error
   * @returns any Ok
   * @throws ApiError
   */
  public static spotifyLoginCallback(
    state: string,
    code?: string,
    error?: string
  ): CancelablePromise<string | UserProfile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/callback',
      query: {
        state: state,
        code: code,
        error: error
      }
    });
  }

  /**
   * Get the currently active Spotify user.
   * @returns SpotifyUserResponse Ok
   * @throws ApiError
   */
  public static getCurrentSpotifyUser(): CancelablePromise<SpotifyUserResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/user'
    });
  }

  /**
   * Get all existing Spotify users
   * @returns any Ok
   * @throws ApiError
   */
  public static getAllSpotifyUsers(): CancelablePromise<Array<any>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/users'
    });
  }

  /**
   * Delete an existing Spotify user
   * @param id
   * @returns void
   * @throws ApiError
   */
  public static deleteSpotifyUser(id: number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/spotify/users/{id}',
      path: {
        id: id
      }
    });
  }

  /**
   * Get the Spotify profile from the currently active user
   * @returns UserProfile Ok
   * @throws ApiError
   */
  public static getSpotifyProfile(): CancelablePromise<UserProfile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/profile'
    });
  }

  /**
   * Get the currently playing track on Spotify. Null if nothing is playing.
   * @returns TrackChangeEvent Ok
   * @throws ApiError
   */
  public static getSpotifyCurrentlyPlaying(): CancelablePromise<TrackChangeEvent> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/spotify/currently-playing'
    });
  }
}
