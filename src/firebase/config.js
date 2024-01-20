// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import 'firebase/firestore'
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTloFRm191CoSaIcNia7UfZDSSqm92UGQ",
  authDomain: "money-us.firebaseapp.com",
  projectId: "money-us",
  storageBucket: "money-us.appspot.com",
  messagingSenderId: "373150830593",
  appId: "1:373150830593:web:46a2b6ed7ccc123a4cf000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectAuth = getAuth(app);
const timestamp = serverTimestamp;
const projectStorage = getStorage(app);

export {projectFirestore, projectAuth, projectStorage, timestamp}