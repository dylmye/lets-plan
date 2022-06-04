/**
 * Uninstall the service worker if it exists, then reload app
 */
export const uninstallWorker = async (): Promise<void> => {
  const registeredWorkers = await navigator?.serviceWorker?.getRegistrations();
  const currentWorker = registeredWorkers?.find(
    (x) => x.scope === "https://lets-plan.ninja/"
  );

  if (!registeredWorkers || !currentWorker) {
    throw new Error(
      "[service-worker] Can't remove service worker - either sw functionality is not enabled, or the service worker for LP has already been removed."
    );
  }

  await currentWorker.unregister();
  window?.location?.reload();
};
