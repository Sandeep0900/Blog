import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "USE YOUR API KEY",
  authDomain: "sandeep-s-storage.firebaseapp.com",
  projectId: "sandeep-s-storage",
  storageBucket: "sandeep-s-storage.appspot.com",
  messagingSenderId: "USE YOUR API ID",
  appId: "USE YOUR API APP-ID",
  measurementId: "USE YOUR MEASUR. ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
