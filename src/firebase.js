// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import{getFirestore}from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXJVaZ05QY8VIT4SKtyxYUTFmPggwVZi4",
  authDomain: "chatroom-39302.firebaseapp.com",
  projectId: "chatroom-39302",
  storageBucket: "chatroom-39302.appspot.com",
  messagingSenderId: "187618245919",
  appId: "1:187618245919:web:c2a74fb361970395f6042a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider()
export const db=getFirestore(app)