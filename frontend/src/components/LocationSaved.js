import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";
import axios from "axios";
import BtnComponent from "./ButtonComponent";
import { FontAwesome } from "@expo/vector-icons";

// Componente principal que exibe as localizações salvas
const LocationSaved = (props) => {
  // State para armazenar as localizações salvas
  const [savedLocations, setSavedLocations] = useState([]);

  // Função para deletar uma localização específica
  const deleteLocation = async (locationId) => {
    try {
      // Deletando a localização do Firestore
      await deleteDoc(doc(db, "locations", locationId));
      // Atualizando o state após deletar
      setSavedLocations(
        savedLocations.filter((location) => location.id !== locationId)
      );
    } catch (error) {
      console.error("Erro ao excluir a localização:", error);
    }
  };

  // useEffect para buscar as localizações salvas assim que o componente é montado
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Buscando todas as localizações da coleção 'locations' no Firestore
        const locationsSnapshot = await getDocs(collection(db, "locations"));
        if (locationsSnapshot.empty) {
          console.log("No saved locations found");
          return;
        }

        const locations = [];
        // Percorrendo cada documento na coleção e adicionando ao array 'locations'
        locationsSnapshot.forEach((doc) => {
          locations.push({ ...doc.data(), id: doc.id });
        });

        // Atualizando as localizações com dados de clima obtidos via API
        const updatedLocations = await Promise.all(
          locations.map(async (location) => {
            try {
              const response = await axios.get(
                "https://api.openweathermap.org/data/2.5/weather",
                {
                  params: {
                    q: location.name,
                    appid: "f389eea64f8256b7f985d868e3a3de38",
                    units: "metric",
                  },
                }
              );
              // Retornando a localização com os dados de clima adicionados
              return {
                ...location,
                weatherData: response.data,
              };
            } catch (error) {
              console.error(
                `Erro ao obter dados do clima para ${location.name}:`,
                error
              );
              return location; // Retorna a localização mesmo sem dados de clima
            }
          })
        );
        // Atualizando o state com as localizações atualizadas
        setSavedLocations(updatedLocations);
      } catch (error) {
        console.error("Erro ao buscar localizações salvas:", error);
      }
    };

    fetchLocations();
  }, []);

  // Função para obter o ícone do clima com base na condição
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return require("../assets/images/Cloud.png");
      case "Clear":
        return require("../assets/images/Clear.png");
      case "Rain":
        return require("../assets/images/Rain.png");
      case "Thunderstorm":
        return require("../assets/images/Thunderstorm.png");
      case "Haze":
      case "Fog":
      case "Mist":
        return require("../assets/images/Haze.png");
      default:
        return null;
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text style={styles.drawerSection}>Localizações Salvas</Text>
      {savedLocations.length === 0 ? (
        <Text style={styles.noLocationsText}>Nenhuma localização salva</Text>
      ) : (
        savedLocations.map((location, index) => (
          <View style={styles.forthContainer} key={index}>
            <Text style={styles.locationName}>{location.name}</Text>
            {location.weatherData ? (
              <View style={styles.weatherInfoContainer}>
                <Image
                  style={styles.weatherIcon}
                  source={getWeatherIcon(location.weatherData.weather[0].main)}
                />
                <Text style={styles.wheaterTitle}>
                  {location.weatherData.main.temp.toFixed()}°C
                </Text>
                <Text style={styles.weatherCond}>
                  {location.weatherData.weather[0].main}
                </Text>
                <BtnComponent
                  styles={styles.delete}
                  onPress={() => deleteLocation(location.id)}
                >
                  <FontAwesome name="trash-o" size={24} color="black" />
                </BtnComponent>
              </View>
            ) : (
              <Text style={styles.loadingText}>
                Carregando dados do clima...
              </Text>
            )}
          </View>
        ))
      )}
    </DrawerContentScrollView>
  );
};

export default LocationSaved;
