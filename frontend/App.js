import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import styles from "./src/styles/styles";
import ClimaAgora from "./src/pages/ClimaAgora";
import LocationSaved from "./src/components/LocationSaved";
import Homepage from "./src/pages/Home";

const Drawer = createDrawerNavigator();

export default function App() {
  const [savedLocations, setSavedLocations] = useState([]);

  //API
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

  //Drawer chamando a página de localizações salvas
  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <LocationSaved {...props} savedLocations={savedLocations} />
    </DrawerContentScrollView>
  );

  return (
    // Acionando o Drawer e navegação de rotas
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Homepage"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#ABC7EB",
            },
            headerStyle: {
              backgroundColor: "#ABC7EB",
              opacity: 0.9,
            },
            headerTintColor: "#DFE9F5",
          }}
        >
          <Drawer.Screen
            name="Homepage"
            component={Homepage}
            options={{
              title: "Home",
              drawerIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="ClimaAgora"
            component={ClimaAgora}
            options={{
              title: "Salve sua Localização",
              drawerIcon: ({ color, size }) => (
                <Entypo name="location" size={size} color={color} />
              ),
            }}
            initialParams={{ addLocation }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}
