import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBn45m39aLJIGi60TwZyC-oqlGC084WO0c",
  authDomain: "ecommerce-e42a1.firebaseapp.com",
  databaseURL: "https://ecommerce-e42a1.firebaseio.com",
  projectId: "ecommerce-e42a1",
  storageBucket: "ecommerce-e42a1.appspot.com",
  messagingSenderId: "905048586617",
  appId: "1:905048586617:web:1edba2245cff722c0d17a8",
  measurementId: "G-VKCG6XJQF9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
