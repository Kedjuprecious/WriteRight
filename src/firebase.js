import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWqVqyUhMqumHDILBulZaRZC0YtOpk5HA",
  authDomain: "rightwrite-b3379.firebaseapp.com",
  projectId: "rightwrite-b3379",
  storageBucket: "rightwrite-b3379.appspot.com",
  messagingSenderId: "778083545899",
  appId: "1:778083545899:web:7a02c56789fc4668974b6e",
  measurementId: "G-2V0Q26N5SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
