import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAHjPhYj4-l0kXD1l2RKTlMIzciy4McCtk",
  authDomain: "trabalhoredesocial-6a0f5.firebaseapp.com",
  projectId: "trabalhoredesocial-6a0f5",
  storageBucket: "trabalhoredesocial-6a0f5.appspot.com",
  messagingSenderId: "42341208226",
  appId: "1:42341208226:web:af791ef28b40742a7d47fb",
  measurementId: "G-KBSVPW240V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { db, auth, analytics, app, storage};