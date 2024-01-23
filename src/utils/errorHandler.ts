import { toastError } from '@/utils/toastHandler';
import type { ApiException } from '@/api/Client';

interface ErrorResponse {
  message: string;
  details: string;
}

// TODO: possibly move this to interceptor and show toast whenever error is thrown
// Are there any scenarios where you would want to explicitly still throw your own error?
// How would this affect .catch()?
export function handleError(response: ApiException) {
  const { message, details } = JSON.parse(response.response) as ErrorResponse;

  toastError({
    title: `${response.status} - ${message}`,
    body: details
  });
}
