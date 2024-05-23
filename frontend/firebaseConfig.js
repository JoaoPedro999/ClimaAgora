
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


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


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
