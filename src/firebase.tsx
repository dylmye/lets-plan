import { getStorage } from "firebase/storage";
import {
  CollectionReference,
  collection,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FirebaseOptions, initializeApp } from "firebase/app";

import UserSnapshot from "./types/firebase/UserSnapshot";
import TripSnapshot from "./types/firebase/TripSnapshot";
import TripItemSnapshot from "./types/firebase/TripItemSnapshot";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);

export const auth = getAuth(firebaseApp);

// modern offline support, might not be supported by some mobile browsers
initializeFirestore(firebaseApp, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const firestore = getFirestore(firebaseApp);

// firestore collections
export const tripsRef = collection(
  firestore,
  "trips"
) as CollectionReference<TripSnapshot>;
export const usersRef = collection(
  firestore,
  "users"
) as CollectionReference<UserSnapshot>;

export const getTripItemsCollection = (
  tripId: string
): CollectionReference<TripItemSnapshot> =>
  collection(
    firestore,
    `trips/${tripId}/items`
  ) as CollectionReference<TripItemSnapshot>;
