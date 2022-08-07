import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, CollectionReference, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import TripItemSnapshot from "./types/firebase/TripItemSnapshot";

import TripSnapshot from "./types/firebase/TripSnapshot";
import UserSnapshot from "./types/firebase/UserSnapshot";

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

export const firestore = getFirestore(firebaseApp);

// firestore collections
export const tripsRef = collection(firestore, 'trips') as CollectionReference<TripSnapshot>;
export const tripItemRef = collection(firestore, 'tripItems') as CollectionReference<TripItemSnapshot>;
export const usersRef = collection(firestore, 'users') as CollectionReference<UserSnapshot>;
