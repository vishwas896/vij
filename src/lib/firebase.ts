
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9_UHK-HyNsExr7CPN0Nu8lbHwgH4Fx0g",
  authDomain: "vij0-2626c.firebaseapp.com",
  projectId: "vij0-2626c",
  storageBucket: "vij0-2626c.appspot.com",
  messagingSenderId: "302997831175",
  appId: "1:302997831175:web:a315f63d18d2c681f9b4a2"
};

let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
