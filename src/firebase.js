// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";

import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYuM1U-HiSv4yQw6UGc5PucwjeReIzj_k",
  authDomain: "plateable-f3a42.web.app",
  projectId: "plateable-f3a42",
  storageBucket: "plateable-f3a42.appspot.com",
  messagingSenderId: "112759364220",
  appId: "1:112759364220:web:fd3008823da9d0873cc7f9",
  measurementId: "G-FTWCCP5BC5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const functions = getFunctions(getApp());
// connectFunctionsEmulator(functions, "localhost", 5001);

export const searchRecipes = httpsCallable(functions, 'searchRecipes');
export const generateRecipes = httpsCallable(functions, 'generateRecipes');

export default firebase;