import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA4P9PwBippm4YL3Px4s0XMkKpsGh7kBA",
  authDomain: "task-manager-edf52.firebaseapp.com",
  projectId: "task-manager-edf52",
  storageBucket: "task-manager-edf52.appspot.com",
  messagingSenderId: "191352915167",
  appId: "1:191352915167:web:f67bcd67e7d46613d0956a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);