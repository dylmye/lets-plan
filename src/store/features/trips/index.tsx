import { useCallback } from "react";

import { useState } from "react";
import { useEffect } from "react";
import { PayloadAction } from "@reduxjs/toolkit";
import useGetActiveProvider from "../../helpers/hooks";
import TripDraft from "../../../types/TripDraft";
import TripDetails from "../../../types/TripDetails";
import Trip from "../../../types/Trip";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as providerRedux from "./redux";
import { TripHooks } from "./interface";
import * as providerFirestore from "./firestore";

export const useAddTrip: TripHooks["useAddTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

  return useCallback(
    (data) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.addTrip(data) as PayloadAction<TripDraft>
        );
      }
      if (activeProvider === "firestore") {
        return providerFirestore.actions.addTrip(data);
      }
    },
    [activeProvider, dispatch]
  );
};

export const useDeleteTrip: TripHooks["useDeleteTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

  return useCallback(
    (tripId) => {
      if (activeProvider === "redux") {
        return dispatch(
          providerRedux.actions.deleteTripById(tripId) as PayloadAction<string>
        );
      }
      if (activeProvider === "firestore") {
        return providerFirestore.actions.deleteTripById(tripId);
      }
    },
    [activeProvider, dispatch]
  );
};

export const useUpdateTrip: TripHooks["useUpdateTrip"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

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
        return providerFirestore.actions.updateTripById(data);
      }
    },
    [activeProvider, dispatch]
  );
};

export const useGetTrips: TripHooks["useGetTrips"] = () => {
  const activeProvider = useGetActiveProvider();
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
      (providerFirestore.selectors.getTrips() as Promise<Trip[]>).then(
        (trips) => {
          setState({ trips, loading: false });
        }
      );
    }
  }, [activeProvider, trips]);

  return state;
};

export const useGetTripsByDateSplit: TripHooks["useGetTripsByDateSplit"] =
  () => {
    const activeProvider = useGetActiveProvider();
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
          providerFirestore.selectors.getTripsByDateSplit() as Promise<
            ReturnType<TripHooks["useGetTripsByDateSplit"]>
          >
        ).then((res) => {
          setState({ ...res, loading: false });
        });
      }
    }, [activeProvider, getTripsByDateSplit]);

    return state;
  };

export const useGetTripById: TripHooks["useGetTripById"] = (tripId) => {
  const activeProvider = useGetActiveProvider();
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
      ).then((res) => {
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
      });
    }
  }, [activeProvider, tripId, trip]);

  return state;
};

export const useAddTripItem: TripHooks["useAddTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

  return useCallback(
    (data) => {
      if (activeProvider === "redux") {
        console.log(data);
        return dispatch(
          providerRedux.actions.addTripItemByTripId(data) as PayloadAction
        );
      }
      if (activeProvider === "firestore") {
        return providerFirestore.actions.addTripItemByTripId(data);
      }
    },
    [activeProvider, dispatch]
  );
};

export const useDeleteTripItem: TripHooks["useDeleteTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

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
        return providerFirestore.actions.deleteTripItemById({ tripId, itemId });
      }
    },
    [activeProvider, dispatch]
  );
};

export const useUpdateTripItem: TripHooks["useUpdateTripItem"] = () => {
  const activeProvider = useGetActiveProvider();
  const dispatch = useAppDispatch();

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
        return providerFirestore.actions.updateTripItemById({ tripId, data });
      }
    },
    [activeProvider, dispatch]
  );
};

/** Store imports */
export type { TripState } from "./redux";
export { default as reducer } from "./redux";
