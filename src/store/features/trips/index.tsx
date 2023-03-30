import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  collection,
  doc,
  FieldPath,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { PayloadAction } from "@reduxjs/toolkit";

import { useGetUserId } from "../auth";
import useGetActiveProvider from "../../helpers/hooks";
import TripItem from "../../../types/Tripitem";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import {
  convertJsonStringToBase64Download,
  convertTripDocument,
  convertTripItemDocuments,
} from "../../../helpers/converters";
import { tripsRef } from "../../../firebase";
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
    async (data) => {
      if (activeProvider === "redux") {
        dispatch(
          providerRedux.actions.addTrip(data) as PayloadAction<TripDraft>
        );
        return {
          id: data.id,
        };
      }
      if (activeProvider === "firestore") {
        try {
          const newTripId: string = await providerFirestore.actions.addTrip(
            data,
            userId
          );
          return {
            id: newTripId,
          };
        } catch (e) {
          console.error(e);
          enqueueSnackbar("Unable to create this trip", {
            variant: "error",
          });
        }
      }
      throw new Error(
        `[store/firestore] provider ${activeProvider} not supported for method useAddTrip`
      );
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
          console.error(e);
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
          console.error(e);
          enqueueSnackbar("Unable to update this trip", {
            variant: "error",
          });
        });
      }
    },
    [activeProvider, dispatch, enqueueSnackbar]
  );
};

export const useMigrateLocalTrips: TripHooks["useMigrateLocalTrips"] = () => {
  // This can only be used by Firebase - no need for provider
  const dispatch = useAppDispatch();
  const userId = useGetUserId();
  const trips = useAppSelector(providerRedux.selectors.getTrips) as Trip[];
  const tripsToMigrate = trips.filter((t) => t.id !== "example");
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(() => {
    if (!tripsToMigrate?.length || !userId) return;
    providerFirestore.actions.batchAddTrips!(tripsToMigrate, userId!).then(
      () => {
        dispatch(
          providerRedux.actions.batchDeleteTripsByIds!(
            tripsToMigrate.map((t) => t.id)
          )
        );
        enqueueSnackbar(
          `Migrated ${tripsToMigrate.length} trip${
            tripsToMigrate.length === 1 ? "" : "s"
          } to your account`
        );
      }
    );
  }, [tripsToMigrate, dispatch, userId, enqueueSnackbar]);
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
          console.error(e);
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

    const now = useMemo(() => Timestamp.now(), []);
    const userIdMatches = where(new FieldPath("userId"), "==", userId);
    const tripIsInPast = where(new FieldPath("endsAt"), "<", now);
    const tripIsCurrent = where(new FieldPath("endsAt"), ">=", now);
    const currentTripsQuery = query(
      tripsRef,
      userIdMatches,
      tripIsCurrent
    ).withConverter<Trip>(convertTripDocument);
    const pastTripsQuery = query(
      tripsRef,
      userIdMatches,
      tripIsInPast
    ).withConverter<Trip>(convertTripDocument);

    const [
      firestoreCurrentValues,
      firestoreCurrentLoading,
      firestoreCurrentError,
    ] = useCollectionData(currentTripsQuery);
    const [firestorePastValues, firestorePastLoading, firestorePastError] =
      useCollectionData(pastTripsQuery);

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
        if (!!firestoreCurrentError || !!firestorePastError) {
          console.error(
            `[store/firebase] error getting trips: current: ${
              firestoreCurrentError ?? " no issues"
            }. past: ${firestorePastError ?? " no issues."}`
          );
        }
        setState({
          past: firestorePastValues ?? [],
          futureCurrent: firestoreCurrentValues ?? [],
          loading: firestoreCurrentLoading || firestorePastLoading,
        });
      }
    }, [
      activeProvider,
      getTripsByDateSplit,
      userId,
      enqueueSnackbar,
      firestoreCurrentError,
      firestoreCurrentLoading,
      firestoreCurrentValues,
      firestorePastError,
      firestorePastLoading,
      firestorePastValues,
    ]);

    return state;
  };

export const useGetTripById: TripHooks["useGetTripById"] = (tripId) => {
  const activeProvider = useGetActiveProvider();
  const { enqueueSnackbar } = useSnackbar();
  const trip = useAppSelector((state) =>
    providerRedux.selectors.getTripById(state, tripId)
  );
  const docRef = doc(tripsRef, tripId).withConverter(convertTripDocument);
  const tripItemsRef = collection(
    tripsRef,
    tripId,
    "items"
  ).withConverter<TripItem>(convertTripItemDocuments);
  const [firestoreTripValue, firestoreTripLoading, firestoreTripError] =
    useDocumentData(docRef);
  const [firestoreItemValues, firestoreItemsLoading, firestoreItemsError] =
    useCollectionData(tripItemsRef);
  const [state, setState] = useState<ReturnType<TripHooks["useGetTripById"]>>({
    loading: true,
  });

  useEffect(() => {
    if (activeProvider === "redux") {
      // firestore trip IDs are a completely different format to local trips
      // so we can safely assume if no trip is returned and a firebase object
      // is that the user is a) not logged in and b) trying to view a public trip.
      setState({
        trip: !!firestoreTripValue
          ? {
              ...firestoreTripValue,
              items: firestoreItemValues ?? [],
            }
          : (trip as Trip),
        // @TODO: set this to true if firebase loading ONLY if there's no trip
        loading: false,
      });
      return;
    }
    if (activeProvider === "firestore") {
      if (firestoreTripError) {
        console.error(
          `[store/firestore] error getting trip with id ${tripId}: ${firestoreTripError}`
        );
      }
      if (firestoreItemsError) {
        console.error(
          `[store/firestore] error getting trip items for trip id ${tripId}: ${firestoreItemsError}`
        );
      }
      setState({
        trip: !!firestoreTripValue
          ? {
              ...firestoreTripValue,
              items: firestoreItemValues ?? [],
            }
          : undefined,
        loading: firestoreTripLoading || firestoreItemsLoading,
      });
    }
  }, [
    activeProvider,
    tripId,
    trip,
    enqueueSnackbar,
    firestoreTripLoading,
    firestoreTripValue,
    firestoreTripError,
    firestoreItemsLoading,
    firestoreItemValues,
    firestoreItemsError,
  ]);

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
            console.error(e);
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
            console.error(e);
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
            console.error(e);
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
          console.error(e);
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
