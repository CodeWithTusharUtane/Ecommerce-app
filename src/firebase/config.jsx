import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAet_BVP50LTDZSVNuqq35vaRzbjrgu2zs",
  authDomain: "headphones-hub.firebaseapp.com",
  projectId: "headphones-hub",
  storageBucket: "headphones-hub.appspot.com",
  messagingSenderId: "447409487006",
  appId: "1:447409487006:web:540dd7adf72df9672b0f8f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);