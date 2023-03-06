import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDayNsSZVnymt-m6hb_gUcmHInQCf5lzJI",
  authDomain: "indmart-a48a0.firebaseapp.com",
  projectId: "indmart-a48a0",
  storageBucket: "indmart-a48a0.appspot.com",
  messagingSenderId: "696416979485",
  appId: "1:696416979485:web:aa1f11f036d4259cf294f4"
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);