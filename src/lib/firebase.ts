
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyC9_UHK-HyNsExr7CPN0Nu8lbHwgH4Fx0g",
  authDomain: "vij0-2626c.firebaseapp.com",
  projectId: "vij0-2626c",
  storageBucket: "vij0-2626c.appspot.com",
  messagingSenderId: "302997831175",
  appId: "1:302997831175:web:a315f63d18d2c681f9b4a2"
};

let app: FirebaseApp;
let auth: ReturnType<typeof getAuth>;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== 'undefined') {
    // Initialize App Check with reCAPTCHA v3
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6LeJ0qMrAAAAAIp_2xX_Zt2hY4eJ_Yj2sWqN7uJ3'),
      isTokenAutoRefreshEnabled: true
    });
  }
} else {
  app = getApp();
}

auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
