import { toastError } from '@/utils/toastHandler';
import type { ApiException } from '@/api/Client';

export interface ErrorResponse {
  message: string;
  details?: string;
}

export function handleError(response: ApiException) {
  try {
    const res = JSON.parse(response.response) as ErrorResponse;
    handleErrorMessage(res);
  } catch (err: any) {
    handleErrorMessage({
      message: response.message,
      details: err.toString()
    });
  }
}

export function handleErrorMessage(message: ErrorResponse) {
  toastError({
    title: message.message,
    body: message.details ?? ''
  });
}
