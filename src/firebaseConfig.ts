// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeXoiatLz9yjvFAT6gKf-eqmCabssQ8oM",
  authDomain: "actividad4-cc071.firebaseapp.com",
  projectId: "actividad4-cc071",
  storageBucket: "actividad4-cc071.firebasestorage.app",
  messagingSenderId: "22078198830",
  appId: "1:22078198830:web:edb659beeb2599e356fbbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services you’ll use
export const db = getFirestore(app);
export const auth = getAuth(app);
