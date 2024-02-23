// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realstate-marketplace.firebaseapp.com",
  projectId: "mern-realstate-marketplace",
  storageBucket: "mern-realstate-marketplace.appspot.com",
  messagingSenderId: "101485310497",
  appId: "1:101485310497:web:70ef07b7d7a2ed8dd66960"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);