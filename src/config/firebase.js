// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOcL_3Hm2Vod_EBQdfAROkZi5HKIDI9rE",
  authDomain: "fir-proj-832a0.firebaseapp.com",
  projectId: "fir-proj-832a0",
  storageBucket: "fir-proj-832a0.appspot.com",
  messagingSenderId: "294750209337",
  appId: "1:294750209337:web:deb3bb5c5b9d453947d4e8",
  measurementId: "G-0T72LPHXYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);