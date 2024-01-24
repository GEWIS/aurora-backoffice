import { toastSuccess } from '@/utils/toastHandler';

export default function SetupInterceptors(): void {
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    const [resource, config] = args;

    const response = await originalFetch(resource, config);

    // TODO how to differentiate between
    // PUT / POST / DELETE (un)successful?
    // Do we want unsuccessful here as error?
    // If we just show the error here, i.e. anything else than expected
    // The error handling can still be done as default (would be nice)

    // Plan; check for all 200 and 201 for success
    // If anything else >= 400, then throw error from backend
    // Is possible, but a bit slower as .clone().json() is required

    if (config!.method == 'POST' && response.status === 201) {
      toastSuccess({
        title: 'Success',
        body: 'Successfully created ...'
      });
    }

    if (config!.method == 'PUT' && response.status === 200) {
      toastSuccess({
        title: 'Success',
        body: 'Successfully updated ...'
      });
    }

    if (config!.method == 'DELETE' && response.status === 200) {
      toastSuccess({
        title: 'Success',
        body: 'Successfully deleted ...'
      });
    }

    return response;
  };
}
