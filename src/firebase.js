// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";

import { getApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "plateable-f3a42.firebaseapp.com",
  projectId: "plateable-f3a42",
  storageBucket: "plateable-f3a42.appspot.com",
  messagingSenderId: "112759364220",
  appId: "1:112759364220:web:fd3008823da9d0873cc7f9",
  measurementId: "G-FTWCCP5BC5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);

export const searchRecipes = httpsCallable(functions, 'searchRecipes');
export const generateRecipes = httpsCallable(functions, 'generateRecipes');
export const getRecipeDetails = httpsCallable(functions, 'getRecipeDetails');
export const getSavedRecipes = httpsCallable(functions, 'getSavedRecipes');
export const getList = httpsCallable(functions, 'getList');
export const addToList = httpsCallable(functions, 'addToList');
export const deleteFromList = httpsCallable(functions, 'deleteFromList');
export const unsaveRecipe = httpsCallable(functions, 'unsaveRecipe');
export const saveRecipe = httpsCallable(functions, 'saveRecipe');

export default firebase;