// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWl6vbbTCDiUAZx7ipagchM4IKuLOjgIY",
  authDomain: "lsps-91455.firebaseapp.com",
  projectId: "lsps-91455",
  storageBucket: "lsps-91455.firebasestorage.app",
  messagingSenderId: "401744284528",
  appId: "1:401744284528:web:52b9d7983b8867e1e25db5",
  measurementId: "G-HLKDQJC8JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);