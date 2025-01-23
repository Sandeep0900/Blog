import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBraNBMspfXeZb9XDAhPXU8MUWFt4teJLc",
  authDomain: "sandeep-s-storage.firebaseapp.com",
  projectId: "sandeep-s-storage",
  storageBucket: "sandeep-s-storage.appspot.com",
  messagingSenderId: "269871179347",
  appId: "1:269871179347:web:aba931396849e9444348a6",
  measurementId: "G-39ZNHDQYC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
