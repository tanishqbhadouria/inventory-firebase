

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaYJaZAYnOPBdQEtismDLudLLNqM3_0gE",
  authDomain: "inventory2-a6e99.firebaseapp.com",
  projectId: "inventory2-a6e99",
  storageBucket: "inventory2-a6e99.appspot.com",
  messagingSenderId: "810407966825",
  appId: "1:810407966825:web:93dce9bca5b468ab4dcaf8",
  measurementId: "G-7W118T3Q5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};

