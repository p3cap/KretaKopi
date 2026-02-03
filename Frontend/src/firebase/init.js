import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyT4w8pcJprTZptGbcbLGDth6ps5iv4Bg",
  authDomain: "kretacopy.firebaseapp.com",
  databaseURL: "https://kretacopy-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kretacopy",
  storageBucket: "kretacopy.firebasestorage.app",
  messagingSenderId: "275174378253",
  appId: "1:275174378253:web:baeadc9f787ab88a633e44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };