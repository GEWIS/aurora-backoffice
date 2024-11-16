import { client, type HttpApiException } from '@/api';
import { toastError } from '@/utils/toastHandler';

/**
 * Fetch interceptor
 * Handles errors and toasts
 */
client.interceptors.response.use((response) => {
  // Let toast implicitly handle each error
  if (response.status >= 400) {
    let httpException: HttpApiException | undefined;
    response
      .clone()
      .json()
      .then((err: HttpApiException) => {
        toastError({
          title: err.name,
          body: err.message,
        });
        httpException = err;
      });
    if (httpException) {
      throw httpException;
    }
  }
  // The only responsibility of a promise is now to "clean up" any side effects of errors
  // The actual error logging is handled by the interceptor and toast handler
  return response;
});
