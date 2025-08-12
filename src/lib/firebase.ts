
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- IMPORTANT ---
// TODO: Replace the placeholder values below with your actual Firebase project configuration.
// You can find this in your Firebase project settings under "General".
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:YOUR_MESSAGING_SENDER_ID:web:YOUR_APP_ID"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
