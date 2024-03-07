/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Partial_Record_SocketioNamespaces_string__ } from './Partial_Record_SocketioNamespaces_string__';

export type LightsControllerResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  /**
   * ID of the socket connection if present.
   * Required to send events specifically and only to this entity.
   * Mapping from namespace to ID, as a websocket has a different ID
   * for each namespace its in.
   */
  socketIds?: Partial_Record_SocketioNamespaces_string__ | null;
};
