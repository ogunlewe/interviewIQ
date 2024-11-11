// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2Y5CaIiU2qsMDvOUUTZgEIBKkdNTAm90",
  authDomain: "interviewiq-1ac1a.firebaseapp.com",
  projectId: "interviewiq-1ac1a",
  storageBucket: "interviewiq-1ac1a.firebasestorage.app",
  messagingSenderId: "534530031661",
  appId: "1:534530031661:web:2356c4e8ba751efeafb8a4",
  measurementId: "G-62VMN9KER5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);