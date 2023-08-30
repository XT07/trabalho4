// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHjPhYj4-l0kXD1l2RKTlMIzciy4McCtk",
  authDomain: "trabalhoredesocial-6a0f5.firebaseapp.com",
  projectId: "trabalhoredesocial-6a0f5",
  storageBucket: "trabalhoredesocial-6a0f5.appspot.com",
  messagingSenderId: "42341208226",
  appId: "1:42341208226:web:af791ef28b40742a7d47fb",
  measurementId: "G-KBSVPW240V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}