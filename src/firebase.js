import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCkVaD4RHLXw1pLnlqM-vqG85fikXUVfsE",
    authDomain: "shopanimal2.firebaseapp.com",
    projectId: "shopanimal2",
    storageBucket: "shopanimal2.appspot.com",
    messagingSenderId: "744797028530",
    appId: "1:744797028530:web:2cf1b77cf91b6fb717c9ab",
    measurementId: "G-FRQVT5WLD1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()