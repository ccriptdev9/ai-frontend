import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDywXgVOE5dbwXs0AZrAmarYxqcycUN-uk",
  authDomain: "ai-ccript.firebaseapp.com",
  projectId: "ai-ccript",
  storageBucket: "ai-ccript.appspot.com",
  messagingSenderId: "654756323555",
  appId: "1:654756323555:web:02ef14176e5b7d2fa865d6",
  measurementId: "G-5XEGG9LW0V",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
