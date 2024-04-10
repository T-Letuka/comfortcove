// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "comfort-cove.firebaseapp.com",
  projectId: "comfort-cove",
  storageBucket: "comfort-cove.appspot.com",
  messagingSenderId: "412927194106",
  appId: "1:412927194106:web:95b365222fd185a0dd2a43",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
