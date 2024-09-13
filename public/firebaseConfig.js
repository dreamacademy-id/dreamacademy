// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLyOxi_cbr7DDSsjkOBsYTnbzSGcMTxSM",
  authDomain: "dreamacademy-example.firebaseapp.com",
  projectId: "dreamacademy-example",
  storageBucket: "dreamacademy-example.appspot.com",
  messagingSenderId: "46737009702",
  appId: "1:46737009702:web:22465b5c608eeffaa6cae7",
  measurementId: "G-N13PKGVSYS"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, signInWithPopup, provider };