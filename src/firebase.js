import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDc1RX0nbvLI5AYJpWmlcUHaDYqxq__o3k",
  authDomain: "course-reviewer-c9db2.firebaseapp.com",
  projectId: "course-reviewer-c9db2",
  storageBucket: "course-reviewer-c9db2.appspot.com",
  messagingSenderId: "199397346389",
  appId: "1:199397346389:web:5768dbb2b3e7bf0d7218dc",
  measurementId: "G-N87ZKEGFDL",
});

const db = firebaseApp.firestore();

export { db };
