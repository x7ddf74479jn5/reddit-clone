import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { FirestoreDataConverter, QueryDocumentSnapshot, WithFieldValue } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const getConverter = <T extends object>(assert: (data: unknown) => asserts data is T): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => {
    assert(data);

    return data;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data({ serverTimestamps: "estimate" });

    const result = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (typeof value.toString == "function" && value.toString().startsWith("Timestamp")) {
          return [key, value.toDate()];
        }
        return [key, value];
      })
    );

    assert(result);

    return result;
  },
});

export { app, auth, db, getConverter, storage };
