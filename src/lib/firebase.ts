
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyC9_UHK-HyNsExr7CPN0Nu8lbHwgH4Fx0g",
  authDomain: "vij0-2626c.firebaseapp.com",
  projectId: "vij0-2626c",
  storageBucket: "vij0-2626c.appspot.com",
  messagingSenderId: "302997831175",
  appId: "1:302997831175:web:a315f63d18d2c681f9b4a2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize App Check only on the client side
if (typeof window !== 'undefined') {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6Lfl0qMrAAAAAGMpdaNCTU958pgXu1e6P9RuNoRw'),
    isTokenAutoRefreshEnabled: true
  });
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
