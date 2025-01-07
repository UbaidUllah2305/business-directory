// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXLrY9No7khkjRcWOok2fQMog7kLiEKWg",
  authDomain: "business-directory-d303a.firebaseapp.com",
  projectId: "business-directory-d303a",
  storageBucket: "business-directory-d303a.firebasestorage.app",
  messagingSenderId: "1005995995715",
  appId: "1:1005995995715:web:5a40f50d0326fe54ebdaf6",
  measurementId: "G-K4W22J5TQ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);