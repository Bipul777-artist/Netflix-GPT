// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk05YOS6AHqzXhZAJthc24oRHOeEs4Ocw",
  authDomain: "netflixgpt-bdcda.firebaseapp.com",
  projectId: "netflixgpt-bdcda",
  storageBucket: "netflixgpt-bdcda.firebasestorage.app",
  messagingSenderId: "857815138748",
  appId: "1:857815138748:web:559a47e758ed999f47ebb9",
  measurementId: "G-5DFZ5CTV3M"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();