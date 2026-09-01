// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuxwj7vDL11aBXtCAaG7CzcWMba7zKdEU",
  authDomain: "bhushan-4779c.firebaseapp.com",
  projectId: "bhushan-4779c",
  storageBucket: "bhushan-4779c.firebasestorage.app",
  messagingSenderId: "439070609511",
  appId: "1:439070609511:web:87682f3dc1d67eb29784c2",
  measurementId: "G-EMHHT1Q462"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics safely
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
