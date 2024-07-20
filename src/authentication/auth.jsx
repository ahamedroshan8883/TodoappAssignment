// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbpDOXLN5xUvJp6yPFkO63Y_lN-thH3no",
  authDomain: "todolist-36632.firebaseapp.com",
  projectId: "todolist-36632",
  storageBucket: "todolist-36632.appspot.com",
  messagingSenderId: "337568522132",
  appId: "1:337568522132:web:eb8b173300e5f994c67981",
  measurementId: "G-FNZY61H8YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };