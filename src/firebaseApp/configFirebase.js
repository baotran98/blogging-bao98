import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0_JoT7Fdi4XKuU7s3EVExfVHBHblZhyg",
  authDomain: "monkey-blogging-bao98.firebaseapp.com",
  projectId: "monkey-blogging-bao98",
  storageBucket: "monkey-blogging-bao98.appspot.com",
  messagingSenderId: "728820268843",
  appId: "1:728820268843:web:e66a45772f2a7938c68f6e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
