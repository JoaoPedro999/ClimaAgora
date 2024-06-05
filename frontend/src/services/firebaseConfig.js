import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByJrzpnFF6-KCp5MApVYh7vuXCo4xCZI8",
  authDomain: "climaagora-28d11.firebaseapp.com",
  projectId: "climaagora-28d11",
  storageBucket: "climaagora-28d11.appspot.com",
  messagingSenderId: "1090079955384",
  appId: "1:1090079955384:web:b003cd2d82540b3469174d",
  measurementId: "G-LE37SE0J30",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const saveLocation = async (location) => {
  try {
    const weatherData = {};

    // Salvando os dados no Firestore
    const docRef = await addDoc(collection(db, "ClimaAgora"), {
      cidade: location,
      clima: weatherData, // Salvando os dados climáticos
    });

    console.log("Document written with ID: ", docRef.id);
    console.log("Localização salva com sucesso no Firestore!");
  } catch (error) {
    console.error("Erro ao salvar a localização no Firestore:", error);
  }
};

export { db, saveLocation };
