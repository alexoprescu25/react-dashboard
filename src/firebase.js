import firebase, { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwIxuW0yraAAwgfFabIYRAGQocqEepd7w",
  authDomain: "react-app-24add.firebaseapp.com",
  projectId: "react-app-24add",
  storageBucket: "react-app-24add.appspot.com",
  messagingSenderId: "1077470064805",
  appId: "1:1077470064805:web:edcfe492b05b03fe5edd4c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);