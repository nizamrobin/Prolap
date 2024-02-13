// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhdt2I0a6Ccxr6NfRVetJ8_v-IPTi4X2E",
  authDomain: "bondhu-4bdf9.firebaseapp.com",
  projectId: "bondhu-4bdf9",
  storageBucket: "bondhu-4bdf9.appspot.com",
  messagingSenderId: "228142402170",
  appId: "1:228142402170:web:72c48aa5c4ac35abee49c3",
  measurementId: "G-2Q1RC5HEXM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
