import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApBMKod6Uj5pLLZK65MrQSo_0q3EXv_wY",
  authDomain: "ecommerceapp-4dbd1.firebaseapp.com",
  projectId: "ecommerceapp-4dbd1",
  storageBucket: "ecommerceapp-4dbd1.firebasestorage.app",
  messagingSenderId: "220431685101",
  appId: "1:220431685101:web:5e5e0853bbb5af696cc3e4",
  measurementId: "G-28RT4H7NP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();