
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
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

function createFirebaseApp(): FirebaseApp {
    if (getApps().length > 0) {
        return getApp();
    }

    const app = initializeApp(firebaseConfig);

    // Initialize App Check only on the client side
    if (typeof window !== 'undefined') {
        // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
        // key is the same one you use in your script tag in `layout.tsx`.
        initializeAppCheck(app, {
            provider: new ReCaptchaEnterpriseProvider("6Lfl0qMrAAAAAGMpdaNCTU958pgXu1e6P9RuNoRw"),
            isTokenAutoRefreshEnabled: true
        });
    }
    return app;
}


export const app = createFirebaseApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
