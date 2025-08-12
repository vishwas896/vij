
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9_UHK-HyNsExr7CPN0Nu8lbHwgH4Fx0g",
  authDomain: "vij0-2626c.firebaseapp.com",
  projectId: "vij0-2626c",
  storageBucket: "vij0-2626c.firebasestorage.app",
  messagingSenderId: "302997831175",
  appId: "1:302997831175:web:a315f63d18d2c681f9b4a2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
