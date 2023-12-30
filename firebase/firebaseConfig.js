// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXgubvHiB33MLa-5fJWHcwdEwymFFlvek",
  authDomain: "finalyearprojecttest-e8705.firebaseapp.com",
  projectId: "finalyearprojecttest-e8705",
  storageBucket: "finalyearprojecttest-e8705.appspot.com",
  messagingSenderId: "1079733624750",
  appId: "1:1079733624750:web:e66056d35fb9658917b23f",
  // measurementId: "G-MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth };
