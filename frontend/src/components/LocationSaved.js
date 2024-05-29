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

const LocationSaved = (props) => {
  const [savedLocations, setSavedLocations] = useState([]);

  const deleteLocation = async (locationId) => {
    try {
      await deleteDoc(doc(db, "locations", locationId));
      setSavedLocations(
        savedLocations.filter((location) => location.id !== locationId)
      );
    } catch (error) {
      console.error("Erro ao excluir a localização:", error);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsSnapshot = await getDocs(collection(db, "locations"));
        if (locationsSnapshot.empty) {
          console.log("No saved locations found");
          return;
        }

        const locations = [];
        locationsSnapshot.forEach((doc) => {
          locations.push({ ...doc.data(), id: doc.id });
        });

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
              return {
                ...location,
                weatherData: response.data,
              };
            } catch (error) {
              console.error(
                `Erro ao obter dados do clima para ${location.name}:`,
                error
              );
              return location;
            }
          })
        );
        setSavedLocations(updatedLocations);
      } catch (error) {
        console.error("Erro ao buscar localizações salvas:", error);
      }
    };

    fetchLocations();
  }, []);

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
        return require("../assets/images/Haze.png");
      case "Fog":
        return require("../assets/images/Haze.png");
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
                  style={[styles.weatherIcon, { width: 40, height: 40 }]}
                  source={getWeatherIcon(location.weatherData.weather[0].main)}
                />
                <Text style={styles.wheaterTitle}>
                  {location.weatherData.main.temp.toFixed()}°C
                </Text>
                <Text style={styles.weatherCond}>
                  {location.weatherData.weather[0].main}
                </Text>

                <BtnComponent onPress={() => deleteLocation(location.id)}>
                  <Text>Excluir</Text>
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
