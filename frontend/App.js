import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View } from "react-native";
import styles from "./src/styles/styles";
import ClimaAgora from "./src/pages/ClimaAgora";
import axios from "axios";
import LocationSaved from "./src/components/LocationSaved";
import Homepage from "./src/pages/Home";
// Importando os icones
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function App() {
  const [savedLocations, setSavedLocations] = useState([]);

  const addLocation = async (newLocation) => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: newLocation,
            appid: "f389eea64f8256b7f985d868e3a3de38",
            units: "metric",
          },
        }
      );
      const locationData = {
        name: newLocation,
        weatherData: response.data,
      };
      setSavedLocations([...savedLocations, locationData]);
    } catch (error) {
      console.error("Erro ao obter dados climáticos:", error);
    }
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Homepage"
          drawerContent={(props) => (
            <View>
              {/* Renderize o componente LocationSaved */}
              <LocationSaved {...props} savedLocations={savedLocations} />
            </View>
          )}
          drawerStyle={{ backgroundColor: "#DFE9F5" }}
          drawerContentOptions={{
            backgroundColor: "#DFE9F5",
            activeBackgroundColor: "#DFE9F5",
            activeTintColor: "white",
            inactiveBackgroundColor: "#DFE9F5",
            inactiveTintColor: "black",
          }}
        >
          <Drawer.Screen
            name="Homepage"
            component={Homepage}
            options={{
              headerStyle: { backgroundColor: "#ABC7EB", opacity: 0.9 },
              headerTintColor: "#DFE9F5",
              title: "Home",
              headerTitle: () => (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />

          <Drawer.Screen
            name="ClimaAgora"
            component={ClimaAgora}
            options={{
              headerStyle: { backgroundColor: "#ABC7EB", opacity: 0.9 },
              headerTintColor: "#DFE9F5",
              title: "Salve sua Localização",
              headerTitle: () => (
                <Entypo name="location" size={24} color="black" />
              ),
            }}
            initialParams={{ addLocation }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
