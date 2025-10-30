// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7_bZ36FmfvDv_kjGtbthjfVeHNbLmT1w",
  authDomain: "react-quiz-app-d4004.firebaseapp.com",
  projectId: "react-quiz-app-d4004",
  storageBucket: "react-quiz-app-d4004.firebasestorage.app",
  messagingSenderId: "605309084101",
  appId: "1:605309084101:web:cf88d42acaf36b7b40ebac",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
