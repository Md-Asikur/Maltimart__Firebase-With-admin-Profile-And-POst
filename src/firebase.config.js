
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC2M1lSmGMvDIZrTojT16slGJvUtCQ_WMQ",
  authDomain: "projectt-a4f8e.firebaseapp.com",
  projectId: "projectt-a4f8e",
  storageBucket: "projectt-a4f8e.appspot.com",
  messagingSenderId: "310677222600",
  appId: "1:310677222600:web:a61582d850e887773161fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;