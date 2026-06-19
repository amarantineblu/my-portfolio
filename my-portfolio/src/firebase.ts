// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCf5ZabBVLJKLyfRmp9iadBlo_oy_f4apM",
  authDomain: "my-portfolio-a3925.firebaseapp.com",
  projectId: "my-portfolio-a3925",
  storageBucket: "my-portfolio-a3925.firebasestorage.app",
  messagingSenderId: "866055941931",
  appId: "1:866055941931:web:06b8d0cb507e917c719f6e",
  measurementId: "G-T3W2T8ND9B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
