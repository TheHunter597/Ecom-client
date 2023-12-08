// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCxaoeNadHp8kQm2-CbEyHzoScS-H1SmMs",
  authDomain: "e-commerce-3ce9e.firebaseapp.com",
  projectId: "e-commerce-3ce9e",
  storageBucket: "e-commerce-3ce9e.appspot.com",
  messagingSenderId: "688959944639",
  appId: "1:688959944639:web:36ad5a91ad4e6d0423930a",
  measurementId: "G-Y763NWHVJM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const database = getDatabase(app);
const analytics = getAnalytics(app);
