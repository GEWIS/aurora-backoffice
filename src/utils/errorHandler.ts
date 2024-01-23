import type { AxiosError } from 'axios';
import { useToast } from 'primevue/usetoast';

interface ErrorResponse {
  message: string;
}

export function isErrorResponse(data: any): data is ErrorResponse {
  return data && typeof data.message === 'string';
}

export function handleError(response: AxiosError) {
  console.log(response);
  // const toast = useToast();
  // if (response.response) {
  //   const { data, status } = response.response;
  //   const code = response.code;
  //   let message = 'An error has occurred';
  //   if (isErrorResponse(data)) {
  //     message = data.message;
  //   }
  //   toast.add({
  //     severity: 'error',
  //     summary: `${status} - ${code}`,
  //     detail: message,
  //     life: 3000
  //   });
  // }
}
