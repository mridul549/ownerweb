// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQyr0XLZApjDzwlK7KJBCZqz9kk4kKQMQ",
    authDomain: "flavr-c527b.firebaseapp.com",
    projectId: "flavr-c527b",
    storageBucket: "flavr-c527b.appspot.com",
    messagingSenderId: "504489315010",
    appId: "1:504489315010:web:e19818dc9f899b4559095b",
    measurementId: "G-2C4RTNEP50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
