import React from "react";
import { View } from "react-native";
import WeatherComponent from "../components/ClimaComponent";
import styles from "../styles/styles";

const ClimaAgora = ({ navigation, route }) => {
  const { addLocation } = route.params;

  return (
    <View style={styles.container}>
      <WeatherComponent addLocation={addLocation} />
    </View>
  );
};

export default ClimaAgora;
