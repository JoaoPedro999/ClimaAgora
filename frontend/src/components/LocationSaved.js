import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database"; 
import { database } from "../../firebaseConfig"; 
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";
import axios from "axios";

const LocationSaved = (props) => {
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRef = ref(database, 'locations');
        onValue(locationsRef, async (snapshot) => {
          const locations = [];
          snapshot.forEach(childSnapshot => {
            const location = childSnapshot.val();
            locations.push({ ...location, id: childSnapshot.key });
          });

          const updatedLocations = await Promise.all(
            locations.map(async (location) => {
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
            })
          );
          setSavedLocations(updatedLocations);
        });
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
      case "Fog":
        return require("../assets/images/Haze.png");
      default:
        return null;
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text style={styles.drawerSection}>Localizações Salvas</Text>
      {savedLocations.map((location, index) => (
        <View style={styles.forthContainer} key={index}>
          <Text style={styles.locationName}>{location.name}</Text>
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
          </View>
        </View>
      ))}
    </DrawerContentScrollView>
  );
};

export default LocationSaved;
