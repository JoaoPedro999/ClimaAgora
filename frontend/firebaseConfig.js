// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByJrzpnFF6-KCp5MApVYh7vuXCo4xCZI8",
  authDomain: "climaagora-28d11.firebaseapp.com",
  databaseURL: "https://climaagora-28d11-default-rtdb.firebaseio.com",
  projectId: "climaagora-28d11",
  storageBucket: "climaagora-28d11.appspot.com",
  messagingSenderId: "1090079955384",
  appId: "1:1090079955384:web:b003cd2d82540b3469174d",
  measurementId: "G-LE37SE0J30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database };
