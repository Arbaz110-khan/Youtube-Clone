// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwIoPOzuw1WMzc3ZOkxq2hC_qbijdnGG4",
  authDomain: "yt-clone-69c51.firebaseapp.com",
  projectId: "yt-clone-69c51",
  storageBucket: "yt-clone-69c51.appspot.com",
  messagingSenderId: "116898401062",
  appId: "1:116898401062:web:a4442939a3763798a24fe7",
  measurementId: "G-P9861LQ650"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let storage=getStorage(app)
export default storage