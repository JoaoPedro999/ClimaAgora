// LocationSaved.js

import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image } from "react-native";
import styles from "../styles/styles";

const LocationSaved = ({ savedLocations, ...props }) => {
  // Função para selecionar o ícone do clima
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
