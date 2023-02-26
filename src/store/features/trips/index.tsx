import { useCallback, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { PayloadAction } from "@reduxjs/toolkit";

import { useGetUserId } from "../auth";
import useGetActiveProvider from "../../helpers/hooks";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import { convertJsonStringToBase64Download } from "../../../helpers/converters";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as providerRedux from "./redux";
import { TripHooks } from "./interface";
import * as providerFirestore from "./firestore";

export const useAddTrip: TripHooks["useAddTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const userId = useGetUserId();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (data) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.addTrip(data) as PayloadAction<TripDraft>
        );
      }
      if (activeProvider === "firestore") {
        return providerFirestore.actions
          .addTrip(data, userId)
          .catch((e: string) => {
            enqueueSnackbar("Unable to create this trip", {
              variant: "error",
            });
          });
      }
    },
    [activeProvider, dispatch, userId, enqueueSnackbar]
  );
};

export const useDeleteTrip: TripHooks["useDeleteTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (tripId) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.deleteTripById(tripId) as PayloadAction<string>
        );
      }
      if (activeProvider === "firestore") {
        providerFirestore.actions.deleteTripById(tripId).catch((e: string) => {
          enqueueSnackbar("Unable to delete this trip", {
            variant: "error",
          });
        });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useUpdateTrip: TripHooks["useUpdateTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (data) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.updateTripById(
            data
          ) as PayloadAction<TripDetails>
        );
      }
      if (activeProvider === "firestore") {
        providerFirestore.actions.updateTripById(data).catch((e: string) => {
          enqueueSnackbar("Unable to update this trip", {
            variant: "error",
          });
        });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useGetTrips: TripHooks["useGetTrips"] = () => {
  const activeProvider = useGetActiveProvider();
  const userId = useGetUserId();
  const { enqueueSnackbar } = useSnackbar();
  const trips = useAppSelector(providerRedux.selectors.getTrips) as Trip[];
  const [state, setState] = useState<ReturnType<TripHooks["useGetTrips"]>>({
    trips: [],
    loading: true,
  });

  useEffect(() => {
    if (activeProvider === "redux") {
      setState({ trips, loading: false });
      return;
    }
    if (activeProvider === "firestore") {
      (providerFirestore.selectors.getTrips(userId) as Promise<Trip[]>)
        .then((trips) => {
          setState({ trips, loading: false });
        })
        .catch((e: string) => {
          enqueueSnackbar("Unable to load your trips", {
            variant: "error",
          });
        });
    }
  }, [activeProvider, trips, userId, enqueueSnackbar]);

  return state;
};

export const useGetTripsByDateSplit: TripHooks["useGetTripsByDateSplit"] =
  () => {
    const activeProvider = useGetActiveProvider();
    const userId = useGetUserId();
    const { enqueueSnackbar } = useSnackbar();
    const getTripsByDateSplit = useAppSelector(
      providerRedux.selectors.getTripsByDateSplit
    ) as ReturnType<TripHooks["useGetTripsByDateSplit"]>;
    const [state, setState] = useState<
      ReturnType<TripHooks["useGetTripsByDateSplit"]>
    >({
      past: [],
      futureCurrent: [],
      loading: true,
    });

    useEffect(() => {
      if (activeProvider === "redux") {
        setState({ ...getTripsByDateSplit, loading: false });
        return;
      }
      if (activeProvider === "firestore") {
        (
          providerFirestore.selectors.getTripsByDateSplit(userId) as Promise<
            ReturnType<TripHooks["useGetTripsByDateSplit"]>
          >
        )
          .then((res) => {
            setState({ ...res, loading: false });
          })
          .catch((e: string) => {
            enqueueSnackbar("Unable to load your trips", {
              variant: "error",
            });
          });
      }
    }, [activeProvider, getTripsByDateSplit, userId, enqueueSnackbar]);

    return state;
  };

export const useGetTripById: TripHooks["useGetTripById"] = (tripId) => {
  const activeProvider = useGetActiveProvider();
  const { enqueueSnackbar } = useSnackbar();
  const trip = useAppSelector((state) =>
    providerRedux.selectors.getTripById(state, tripId)
  );
  const [state, setState] = useState<ReturnType<TripHooks["useGetTripById"]>>({
    loading: true,
  });

  useEffect(() => {
    if (activeProvider === "redux") {
      setState({ trip: trip as Trip, loading: false });
      return;
    }
    if (activeProvider === "firestore") {
      (
        providerFirestore.selectors.getTripById(tripId) as Promise<{
          trip?: Trip;
        }>
      )
        .then((res) => {
          /** @TODO: re-add trip item loading:
           *
           * if (grabbedTripDoc.exists()) {
            const tripData = grabbedTripDoc.data();

            // fetch the trip items and merge them in with the trip data
            const tripItemsCollection = collection(
              tripsRef,
              tripId,
              "items"
            ).withConverter<TripItem>(convertTripItemDocuments);

            getDocs(tripItemsCollection)
              .then((grabbedTripItemDocs) => {
                if (!grabbedTripItemDocs.empty) {
                  const combinedTripData = {
                    ...tripData,
                    items: grabbedTripItemDocs.docs.map((x) => x.data()),
                  } as Trip;
                  setState({
                    data: combinedTripData,
                    loading: false,
                  });
                } else {
                  setState({
                    data: tripData,
                    loading: false,
                  });
                }
              })
              .catch((e) =>
                console.error("Unable to fetch trip list items:", e)
              );
          }
           */
          setState({ trip: res as Trip, loading: false });
        })
        .catch((e: string) => {
          enqueueSnackbar("Unable to load this trip", {
            variant: "error",
          });
        });
    }
  }, [activeProvider, tripId, trip, enqueueSnackbar]);

  return state;
};

export const useAddTripItem: TripHooks["useAddTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (data) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.addTripItemByTripId(data) as PayloadAction
        );
      }
      if (activeProvider === "firestore") {
        providerFirestore.actions
          .addTripItemByTripId(data)
          .catch((e: string) => {
            enqueueSnackbar("Unable to add this itinerary to a trip", {
              variant: "error",
            });
          });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useDeleteTripItem: TripHooks["useDeleteTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (tripId, itemId) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.deleteTripItemById({
            tripId,
            itemId,
          }) as PayloadAction
        );
      }
      if (activeProvider === "firestore") {
        providerFirestore.actions
          .deleteTripItemById({ tripId, itemId })
          .catch((e: string) => {
            enqueueSnackbar("Unable to delete this trip itinerary", {
              variant: "error",
            });
          });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useUpdateTripItem: TripHooks["useUpdateTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (tripId, data) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.updateTripItemById({
            tripId,
            data,
          }) as PayloadAction
        );
      }
      if (activeProvider === "firestore") {
        providerFirestore.actions
          .updateTripItemById({ tripId, data })
          .catch((e: string) => {
            enqueueSnackbar("Unable to update this trip itinerary", {
              variant: "error",
            });
          });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useExportTrips: TripHooks["useExportTrips"] = () => {
  const activeProvider = useGetActiveProvider();
  const userId = useGetUserId();
  const { enqueueSnackbar } = useSnackbar();
  const tripsExport = useAppSelector(providerRedux.selectors.exportTrips) as {
    data: string;
  };
  const [state, setState] = useState<ReturnType<TripHooks["useExportTrips"]>>({
    data: "",
    loading: true,
  });

  useEffect(() => {
    if (activeProvider === "redux") {
      const res = convertJsonStringToBase64Download(tripsExport.data);
      setState({ data: res, loading: false });
      return;
    }
    if (activeProvider === "firestore") {
      (
        providerFirestore.selectors.exportTrips(userId) as Promise<{
          data: string;
        }>
      )
        .then(({ data }) => {
          const res = convertJsonStringToBase64Download(data);
          setState({ data: res, loading: false });
        })
        .catch((e: string) => {
          enqueueSnackbar("Unable to export trips", {
            variant: "error",
          });
        });
    }
  }, [activeProvider, tripsExport, userId, enqueueSnackbar]);

  return state;
};

/** Store imports */
export { default as reducer } from "./redux";
