/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldErrors } from './FieldErrors';

export type ValidateError = {
  name: string;
  message: string;
  stack?: string;
  status: number;
  fields: FieldErrors;
};
