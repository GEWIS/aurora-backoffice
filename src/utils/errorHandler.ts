import { toastError } from '@/utils/toastHandler';
import type { HttpApiException } from '@/api';
import { ApiError } from '@/api';

export interface ErrorResponse {
  message: string;
  details?: string;
}

// TODO check if still correct
export function handleError(response: HttpApiException | ApiError) {
  handleErrorMessage({
    message: response.name,
    details: response.message
  });
}

export function handleErrorMessage(message: ErrorResponse) {
  toastError({
    title: message.message,
    body: message.details ?? ''
  });
}
