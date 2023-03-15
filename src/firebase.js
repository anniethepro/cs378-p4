// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwoYzRhBQA4C7BA3ROwr9r78CyjClUpdo",
  authDomain: "cs378-p4-2cdd3.firebaseapp.com",
  databaseURL: "https://cs378-p4-2cdd3-default-rtdb.firebaseio.com",
  projectId: "cs378-p4-2cdd3",
  storageBucket: "cs378-p4-2cdd3.appspot.com",
  messagingSenderId: "790590890132",
  appId: "1:790590890132:web:29f57aefd32687fa15d481",
  measurementId: "G-TLP9ZZ2FRK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase();


