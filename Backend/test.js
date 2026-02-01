// 🧱 Initialize Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC05D_gKth_D5BHJU4E2KOP4pCMoIUIgvY",
  authDomain: "abcd-1bd17.firebaseapp.com",
  projectId: "abcd-1bd17",
  storageBucket: "abcd-1bd17.firebasestorage.app",
  messagingSenderId: "478242547407",
  appId: "1:478242547407:web:86db4add9ec2bce53a79ba"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ————————————————
// Example: add a document
async function addData() {
  try {
    const docRef = await addDoc(collection(db, "myCollection"), {
      name: "Teszt",
      age: 99
    });
    console.log("ID:", docRef.id);
  } catch (e) {
    console.error("Hiba az írásnál:", e);
  }
}

// ————————————————
// Example: read documents
async function readData() {
  try {
    const querySnapshot = await getDocs(collection(db, "myCollection"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (e) {
    console.error("Hiba az olvasásnál:", e);
  }
}

// Call them if you want:
addData();
readData();
