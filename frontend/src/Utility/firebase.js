
import firebase from 'firebase/compat/app';
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDidGzWkatHj7eYeF6wdbkXRFZMiX04y7E",
  authDomain: "clone-bd342.firebaseapp.com",
  projectId: "clone-bd342",
  storageBucket: "clone-bd342.firebasestorage.app",
  messagingSenderId: "867848966424",
  appId: "1:867848966424:web:54d3e7bf37c310c50e8e6d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= firebase.firestore()
