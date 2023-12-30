import { firebase } from "@react-native-firebase/firestore";
import { getApps, initializeApp } from "firebase/app";
//import { au } from 'firebase/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { length, apps } from "@react-native-firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXgubvHiB33MLa-5fJWHcwdEwymFFlvek",
  authDomain: "finalyearprojecttest-e8705.firebaseapp.com",
  projectId: "finalyearprojecttest-e8705",
  storageBucket: "finalyearprojecttest-e8705.appspot.com",
  messagingSenderId: "1079733624750",
  appId: "1:1079733624750:web:e66056d35fb9658917b23f",
   measurementId: "G-MEASUREMENT_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
/*
if(getApps().length < 1){
    firebase.initializeApp(firebaseConfig);

}
export {firebase};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
*/
export { firebase };
